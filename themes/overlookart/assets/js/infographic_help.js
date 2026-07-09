import { Infographic } from '@antv/infographic'

console.debug('infographic_help.js');

function initInfographic() {
    const infographicContainers = document.querySelectorAll('.infographic-container');
    console.debug('Found infographic containers:', infographicContainers.length);
    
    if (infographicContainers.length === 0) {
        console.debug('No infographic containers found');
        return;
    }
    
    infographicContainers.forEach((container, index) => {
        const infographicContent = container.getAttribute('data-infographic')?.trim();
        console.debug(`Infographic ${index} Content:`, infographicContent);
        
        // 验证基本语法格式
        if (!infographicContent || !infographicContent.startsWith('infographic ')) {
            console.error(`Invalid infographic syntax in container ${index}: must start with "infographic "`);
            return;
        }
        
        // 为每个容器创建唯一的 ID
        const containerId = `infographic-${index}`;
        container.id = containerId;
        
        const infographicInstance = new Infographic({
            container: `#${containerId}`,
            width: '100%',
            height: '100%'
        });

        try {
            infographicInstance.render(infographicContent);
        } catch (error) {
            console.error(`Infographic render error in container ${index}:`, error);
        }
    });
}

setTimeout(initInfographic, 300);

