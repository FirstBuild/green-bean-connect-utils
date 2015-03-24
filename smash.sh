#!/bin/bash

FILES=./output/*json*
OUTFILE=./output/resuls.txt

echo "" > $OUTFILE
for f in $FILES
do
  echo "Processing $f file..."
  cat $f >> $OUTFILE
  echo "=============================================" >> $OUTFILE

done