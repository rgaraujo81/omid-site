#!/usr/bin/env bash
# Gera os loops ambientes de fundo a partir das cores oficiais da OMID.
# Nada de banco de imagens: o vídeo é sintetizado com o gradiente da marca.
#   bash tools/gerar-video.sh
set -euo pipefail
cd "$(dirname "$0")/.."
OUT=assets/video
mkdir -p "$OUT"

W=1024; H=576; FPS=24; DUR=20

# Cores oficiais (LogoOMID.svg)
TEAL=0x40ADB7; BLUE=0x2D93BB; INDIGO=0x545EA0
PURPLE=0x7F2483; PINK=0xE73587; ORANGE=0xEE744E; AMBER=0xF8B241

gerar () {                       # $1 nome  $2 tipo  $3 velocidade  $4 sigma do blur
  local nome=$1 tipo=$2 vel=$3 sig=$4
  local src="gradients=s=${W}x${H}:c0=${TEAL}:c1=${BLUE}:c2=${INDIGO}:c3=${PURPLE}:c4=${PINK}:c5=${ORANGE}:c6=${AMBER}:nb_colors=7:x0=120:y0=90:x1=$((W-140)):y1=$((H-110)):type=${tipo}:speed=${vel}:duration=${DUR}:d=${DUR}:r=${FPS}"
  local vf="gblur=sigma=${sig},eq=saturation=1.05:contrast=0.94,format=yuv420p"

  echo "→ ${nome}.webm"
  ffmpeg -y -loglevel error -f lavfi -i "$src" -vf "$vf" \
    -c:v libvpx-vp9 -b:v 0 -crf 40 -row-mt 1 -deadline good -cpu-used 2 \
    -pix_fmt yuv420p -an "$OUT/${nome}.webm"

  echo "→ ${nome}.mp4"
  ffmpeg -y -loglevel error -f lavfi -i "$src" -vf "$vf" \
    -c:v libx264 -preset slow -crf 30 -profile:v main -pix_fmt yuv420p \
    -movflags +faststart -an "$OUT/${nome}.mp4"

  echo "→ ${nome}.jpg (poster)"
  ffmpeg -y -loglevel error -f lavfi -i "$src" -vf "$vf,scale=640:-2" \
    -frames:v 1 -q:v 6 "$OUT/${nome}.jpg"
}

# fundo claro do hero — movimento lento, difusão ampla
gerar "ambiente-claro" "radial" 0.012 96
# fundo escuro do bloco de CTA — deriva em espiral, mais definida
gerar "ambiente-escuro" "spiral" 0.020 72

ls -lh "$OUT"
