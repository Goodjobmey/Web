document.addEventListener("DOMContentLoaded", function () {
    const svgGraph = document.getElementById('graph');
    const dynamicLayer = document.getElementById('dynamic-layer');
    const pointsLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    pointsLayer.setAttribute("id", "points-layer");
    svgGraph.appendChild(pointsLayer);

    const radioButtons = document.querySelectorAll('input[type="radio"][name$="r"]');

    function getCurrentR() {
        const rInput = document.querySelector('input[type="radio"][name$="r"]:checked');
        return rInput ? parseFloat(rInput.value) : null;
    }

    function updateDynamicLayer(r) {
        if (!r) return;
        dynamicLayer.innerHTML = `
            <polygon points="${300},${300} ${300},${300 + 100 * r / 2} ${300 - 100 * r},${300}" fill="#333" fill-opacity="0.5" stroke="#333" />
            <polygon points="${300},${300} ${300},${300 - 100 * r / 2} ${300 + 100 * r},${300 - 100 * r / 2} ${300 + 100 * r},${300}" fill="#333" fill-opacity="0.5" stroke="#333" />
            <path d="M${300},${300} ${300 + 100 * r},${300} A${100 * r},${100 * r} 0 0,1 ${300},${300 + 100 * r} Z" fill="#333" fill-opacity="0.5" stroke="#333" />
        `;
    }

    function convertPixelToGraphCoords(x, y, r) {
        const graphX = ((x - 300) / 100) * r;
        const graphY = ((300 - y) / 100) * r;
        return { x: graphX.toFixed(2), y: graphY.toFixed(2) };
    }

    function addPoint(x, y) {
        const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        point.setAttribute("cx", x);
        point.setAttribute("cy", y);
        point.setAttribute("r", "4");
        point.setAttribute("fill", "red");
        pointsLayer.appendChild(point);
    }

    radioButtons.forEach(button => {
        button.addEventListener('change', function () {
            updateDynamicLayer(parseFloat(this.value));
        });
    });

    updateDynamicLayer(getCurrentR());
});
