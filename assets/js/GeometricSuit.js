import './MathJax.min.js';

MathJax.Hub.Config({
  skipStartupTypeset: true,
  extensions: ["tex2jax.js", "TeX/AMSmath.js"],
  jax: ["input/TeX", "output/HTML-CSS"],
  tex2jax: {
    inlineMath: [["$", "$"]],
    processEscapes: true
  }
});

let hub = MathJax.Hub;

hub.Queue(['Typeset', hub, 'render']);
hub.Queue(['Typeset', hub, 'result-']);

function maths(id) {
  let hub = MathJax.Hub;

  for(const element of id) {
    hub.Queue(["Typeset", hub, element]);
  };
};

class GeometricSuit {
  /**
  * @description Set default geometric suit
  * @param { number } start
  * @param { number } reason
  * @param { number } rank
  */
  constructor(start, reason, rank) {
    this.start = start;
    this.reason = reason;
    this.rank = rank;
  };

  /**
  * @description Return an array of all value for each rank
  * @returns { number[] }
  */
  all() {
    const u = new Array();
    for(let i = 0; i < this.rank; i++) {
      u.push(this.start * this.reason ** (i - 1));
    };

    return u;
  };

  /**
   * @description Return is geometric suit
   * @param { number } n
   * @returns { number }
   */
  get(n) {
    return this.start * this.reason ** (n - 1);
  };
};

window.addEventListener('DOMContentLoaded', () => {
  function calc() {
    const start = Number(document.getElementById('input-start').value);
    const reason = Number(document.getElementById('input-reason').value);
    const rank = Number(document.getElementById('input-rank').value) + 1;

    const suit = new GeometricSuit(start, reason, rank);

    const table = document.getElementById('modal-table');

    table.querySelector('tbody').innerHTML = ``;

    const id = [];

    for(let i = 0; i < suit.rank; i++) {
      const thisId = Date.now().toString(36) + Math.random().toString(36)

      id.push(thisId);

      table.querySelector('tbody').innerHTML += `
        ${i > 0 ? `
        <tr>
          <td> $U_{${i}}$ </td>
          <td> $${suit.all()[i]}$ </td>
          <td id="${id}">$U_{${i}}$ = $${start}$ $*$ $ ${reason} ^ {${i - 1}} $</td>
        </tr>` : ''}`;
      };

      maths(id);
  };

  document.getElementById('calc')?.addEventListener('click', calc);
  document.getElementById('input-start')?.addEventListener('input', calc);
  document.getElementById('input-reason')?.addEventListener('input', calc);
  document.getElementById('input-rank')?.addEventListener('input', calc);


  document.getElementById('input-search')?.addEventListener('input', function() {
    const start = Number(document.getElementById('input-start').value);
    const reason = Number(document.getElementById('input-reason').value);
    const rank = Number(document.getElementById('input-rank').value) + 1;

    // console.log(reason);

    const suit = new GeometricSuit(start, reason, rank);

    const table = document.getElementById('modal-table');

    if(this.value !== '') {
      const id = Date.now().toString(36) + Math.random().toString(36);
      table.querySelector('tbody').innerHTML = ``;

      table.querySelector('tbody').innerHTML = `
        <tr>
          <td>$U_{${this.value}}$ </td>
          <td>$${suit.get(Number(this.value))}$</td>
          <td id="${id}">$U_{${this.value}}$ = $${start}$ $*$ $${reason}^{${this.value - 1}}$</td>
        </tr>`

        maths(id);
    } else {
      table.querySelector('tbody').innerHTML = ``;

      const id = [];

      for(let i = 0; i < suit.rank; i++) {
        const thisId = Date.now().toString(36) + Math.random().toString(36)

        id.push(thisId);

        table.querySelector('tbody').innerHTML += `
          ${i > 0 ? `
          <tr>
            <td> U<sub>${i}</sub> </td>
            <td> ${suit.all()[i]} </td>
            <td id="${thisId}">\\[U_${i} = ${start} * ${reason}^${i - 1}\\]</td>
          </tr>` : ''}`;
      };

      maths(id);
    };
  });
});
