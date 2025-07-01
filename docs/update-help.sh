cd "$(dirname $(realpath "${BASH_SOURCE[0]}"))"

echo "$(printf '\x2D%.0s' {1..80})"
runAt=$(date +"%Y-%m-%dT%H:%M:%SZ")
echo "-- runAt: '$(date +"%Y-%m-%dT%H:%M:%SZ")'"
function onExit() {
  echo ''
  echo "-- endAt: '$(date +"%Y-%m-%dT%H:%M:%SZ")'"
  echo "$(printf '\x2D%.0s' {1..80})"
}
trap 'onExit' EXIT


out_file='./help/node-version.txt'
echo -e '$ node --version \n'             &>> ${out_file}
node --version                            &>> ${out_file}
out_file=''

npx eas --help               &>  help/eas-help.txt
npx eas credentials --help   &>  help/eas-credentials-help.txt