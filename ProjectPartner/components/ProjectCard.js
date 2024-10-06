function ProjectCard(project) {
    return `
        <div class="project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <button onclick="viewProject('${project.id}')">查看详情</button>
        </div>
    `;
}
