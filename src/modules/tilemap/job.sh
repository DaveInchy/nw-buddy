#!/bin/bash
# ./[$0: Script = ./script.sh | /bin/bash ] [1: Y Limit = [0-55]] [ 2: Directory Name =  "00"] [ 3: Z Layer to Extract = [1-7]];
# Your LX.js is the formatted Array object you can use as JSON but with qol features.
function _create2dJSON() {
    export LIMIT=${1:-55};
    export ID=${2:-'00'};
    export LAYER=${3:-'1'};

    for ((i=0;$i<=$LIMIT;i++)) do

        [[ $i -lt 1000 ]] && \
            export n=${i};
        [[ $i -lt 100 ]] && \
            export n=0${i};
        [[ $i -lt 10 ]] && \
            export n=00${i};

		export list=$(ls -AS ./${ID}/MAP_L${LAYER}_Y${n}_X** >> ./${ID}/L${LAYER}_Y${n}_X.LIST);

        for CTX in $(cat ./${ID}/L${LAYER}_Y${n}_X.LIST); do
            echo -e "\t\t\"${CTX}\",";
		done >> ./${ID}/L${LAYER}_${n}.CACHE;

        [[ $i -eq 0 ]] && \
            echo -e "// Javascript Module by Dave Inchy:\n// Source map for layer '${LAYER}' in '${ID}' as 'L${LAYER}.JS' \n""export default L${LAYER} =\n[\n\t[";
        [[ $i -lt $LIMIT ]] && \
			echo -e $(cat ./${ID}/L${LAYER}_${n}.CACHE) && \
			echo -e "\t],\n\t[";
		[[ $i -eq $LIMIT ]] && \
            echo -e "\t]\n];";

    done >> ./${ID}/L${LAYER}.JS
}

_create2dJSON ${1} ${2} ${3};
exit $?