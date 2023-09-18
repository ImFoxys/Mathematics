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

function maths() {
  let hub = MathJax.Hub;

  hub.Queue(["Typeset", hub, "render"]);
}

class PythagoreTheorem {
  constructor(ab, ac) {
    this.ab = ab;
    this.ac = ac;
  };

  get() {
    return Math.sqrt(this.ac * this.ac + this.ab * this.ab);
  };
};

window.addEventListener('DOMContentLoaded', () => { 
  function calc() {
    const ab = parseInt(document.getElementById('input-ab').value);
    const ac = parseInt(document.getElementById('input-ac').value);

    const theorem = new PythagoreTheorem(ab, ac);

    document.getElementById('PythagoreTheorem-result').innerHTML = `
      <p>
        \\[BC^2 = AB^2 + AC^2\\] 
        \\[BC^2 = ${ab}^2 + ${ac}^2\\] 
        \\[BC^2 = ${ab * ab} + ${ac * ac}\\] 
        \\[BC = \\sqrt{${ab * ab + ac * ac}}\\]
        \\[BC = ${Math.sqrt(ab * ab + ac * ac)}\\]
      </p>
    `;

    maths();

    return theorem.get();
  };

  document.getElementById('input-ab')?.addEventListener('input', calc);
  document.getElementById('input-ac')?.addEventListener('input', calc);
});
