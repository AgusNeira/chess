export default class Board {
    static ROWS = [1, 2, 3, 4, 5, 6, 7, 8];
    static COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    constructor(parent) {
        this.parent = parent;
        this.width = parent.clientWidth;
        this.height = parent.clientHeight;
        this.labelMargins = 20
        this.squareSize = (Math.min(this.width, this.height) - this.labelMargins) / 8;

        this.parent.append(this.squares());
        this.parent.append(...this.labels());
    }

    squares() {
        let group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        let isWhite = true;
        for (let x = 0; x < Board.COLS.length; x++) {
            for (let y = 0; y < Board.ROWS.length; y++) {
                let square = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
                square.setAttribute('id', `${Board.COLS[x]}${Board.ROWS[y]}`);
                square.setAttribute('width', this.squareSize);
                square.setAttribute('height', this.squareSize);
                square.setAttribute('x', x * this.squareSize + this.labelMargins);
                square.setAttribute('y', y * this.squareSize + this.labelMargins);
                square.setAttribute('fill', isWhite? 'white': 'black');
                group.appendChild(square);

                isWhite = !isWhite;
            }
            isWhite = !isWhite;
        }
        return group;
    }
    labels() {
        let topMargin = this.labelMargins * 0.3;
        let labelSize = this.labelMargins * 0.4;

        let hgroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        for (let x = 0; x < Board.COLS.length; x++) {
            let label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.innerHTML = Board.COLS[x];
            label.setAttribute('x', this.labelMargins + x * this.squareSize + this.squareSize / 2);
            label.setAttribute('y', topMargin + labelSize);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('text-size', labelSize);
            label.setAttribute('font-family', 'sans-serif');
            hgroup.appendChild(label);
        }

        let leftMargin = this.labelMargins * 0.15;
        let vgroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        for (let y = 0; y < Board.ROWS.length; y++) {
            let label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.innerHTML = Board.ROWS[y];
            label.setAttribute('x', leftMargin);
            label.setAttribute('y', this.labelMargins + y * this.squareSize + (this.squareSize + labelSize)/2);
            label.setAttribute('text-size', labelSize);
            label.setAttribute('font-family', 'sans-serif');
            vgroup.append(label);
        }

        return [hgroup, vgroup];
    }
};
