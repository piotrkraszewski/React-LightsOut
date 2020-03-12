import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


class Board extends Component {

    static defaultProps = {
        nrows: 5,
        ncols: 5,
        chanceLightStartsOn: 0.25
    }

  state = {
      hasWon: false,
      board: this.createBoard()
  }

  createBoard() {
    let board = [];
    // create array-of-arrays of true/false values
    for(let y=0; y < this.props.nrows; y++){
        let row = []
        for(let x=0; x < this.props.ncols; x++){
            row.push(Math.random() < this.props.chanceLightStartsOn)
        }
        board.push(row)
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log("flipping", coord);
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x]; // zmienia wartosc komórki na odwrotn¹
      }
    }

    flipCell(y, x)    // Flip center cell
    flipCell(y, x - 1) // Flip left
    flipCell(y, x + 1) // Flip right
    flipCell(y - 1, x) // Flip below
    flipCell(y + 1, x) // Flip above

    // czy to prawda ze ka¿da komórka w ka¿dym rzêdzie ma wartoœæ false
    let hasWon = board.every(row => row.every(cell => !cell))

    this.setState({ board: board, hasWon: hasWon })
  }


  /** Render game board or winning message. */

  render() {
    if(this.state.hasWon){
      return (
        <div className='Board-title'>
          <div className='Winner'>
            <span className='neon-orange'>YOU</span>
            <span className='neon-blue'>WIN</span>
          </div>
        </div>
        )
    }

    let tblBoard = []
    for(let y = 0; y < this.props.nrows;y++){
        let row = []
        for(let x = 0; x < this.props.ncols; x++){
            let coord = `${y}-${x}`
            row.push(<Cell key={coord} isLit={this.state.board[y][x]} flipCellsAroundMe={() => this.flipCellsAround(coord)}/>)
        }
    tblBoard.push(<tr>{row}</tr>)
    }
    return(
      <div>
        {this.state.hasWon 
        ? (
        <div className='Board-title'>
          <div className='neon-orange'>Lights</div>
          <div className='neon-blue'>Out</div>
        </div>
        ) : (
        <table className="Board">
          <tbody>
              {tblBoard}
          </tbody>
        </table>
        )}
      </div>
    )
  }
}


export default Board;