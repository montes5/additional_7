module.exports = function solveSudoku(matrix) {
	let posVal = [1,2,3,4,5,6,7,8,9]; // possible values array
	for(let lineCounter = 0; lineCounter < 9; lineCounter++) {
		for(let colCounter = 0; colCounter < 9; colCounter++) {
			if(matrix[lineCounter][colCounter] == 0) {
				// line selection
        posVal = posVal.filter((elem) => matrix[lineCounter].indexOf(elem) == -1);

        // column selection
        posVal = posVal.filter((elem) => {
            let colVal = []; // column values array
            for(let i = 0; i < 9; i++) {
                colVal.push(matrix[i][colCounter]);
            }
            return colVal.indexOf(elem) == -1; // column check
        });

        // 3x3 selection
        posVal = posVal.filter((elem) => {
            function countCounter(counter) {
                let value = 0;
                if(counter > 2) {
                    value = 3;
                    if(counter > 5) value = 6;
                }
                return value;
            }
            let line3x3Counter = countCounter(lineCounter);
            let col3x3Counter = countCounter(colCounter);

            let squareVal = []; // 3x3 values array
            for(let i = line3x3Counter; i < line3x3Counter + 3; i++) {
                for(let j = col3x3Counter; j < col3x3Counter + 3; j++) {
                    squareVal.push(matrix[i][j]);
                }
            }

            return squareVal.indexOf(elem) == -1;
        });

        // solving
				// if possible values array is not empty
        for(let i = 0; i < posVal.length; i++) {
            matrix[lineCounter][colCounter] = posVal[i];
            if(solveSudoku(matrix)) return matrix;
        }
				//if possible values array is empty
        matrix[lineCounter][colCounter] = 0;
        return false;
    	}
		}
  }
	//if there are no any zeros in matrix
	return true;
}
