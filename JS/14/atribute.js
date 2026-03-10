window.onload = function() {
    //2
    let header = document.createElement('header');
    header.style.padding = '50px';
    header.style.backgroundColor = 'yellow';
    header.style.textAlign = 'center';
    document.body.prepend(header);

    //3
    const menuData = [
        { name: 'Головна', url: '/' },
        { name: 'Про нас', url: '/about' },
        { name: 'Послуги', url: '/services' },
        { name: 'Контакти', url: '/contacts' },
        { name: 'Блог', url: '/blog' }
    ];

    //4
    menuData.forEach(item => {
        let a = document.createElement('a');
        a.textContent = item.name;
        
        a.href = item.url;
        a.target = '_blank';

        a.style.textDecoration = 'none';
        a.style.color = 'black';
        a.style.fontWeight = 'bold';
        a.style.transition = '0.3s';
        a.onmouseover = () => a.style.color = '#4CAF50';
        a.onmouseout = () => a.style.color = 'black';

        header.appendChild(a);
    });

    //5
    let boxContainer = document.createElement('div');
    boxContainer.id = 'boxContainer';
    boxContainer.style.display = 'flex';
    boxContainer.style.flexWrap = 'wrap';
    boxContainer.style.gap = '10px';
    boxContainer.style.marginTop = '20px';
    document.body.appendChild(boxContainer);

   
    for (let i = 1; i <= 50; i++) {
        let div = document.createElement('div');
        div.classList.add('circle-elemt'); //6
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.borderRadius = '50%';
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        div.style.backgroundColor = `hsl(${i * 7}, 70%, 50%)`; //bonus
        div.style.color = 'white';
        div.style.fontSize = '12px';
        div.style.fontWeight = 'bold';
        div.style.transition = 'transform 0.3s';

        div.onmouseover = () => div.style.transform = 'scale(1.2)';
        div.onmouseout = () => div.style.transform = 'scale(1)';

        div.textContent = i;
        boxContainer.appendChild(div);
    }
}