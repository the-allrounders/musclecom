#!/usr/bin/env bash

# Change to current directory
cd "$(dirname "$0")"

crontab_entry="@reboot bash $(pwd)/start.sh >> /var/log/musclecom.log 2>&1"

if [[ $(crontab -l 2>/dev/null) == *${crontab_entry}* ]]; then
  echo "ℹ️ De cronjob bestaat al."
else
  echo "ℹ️ De cronjob was niet gevonden. Cronjob installeren..."
  (crontab -l 2>/dev/null; echo ${crontab_entry}) | crontab -
  echo "ℹ️ MuscleCom wordt nu automatisch opgestart."
  echo ""
  echo ""
  bash start.sh
fi

