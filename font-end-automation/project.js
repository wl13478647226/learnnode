var projectData = {
    'name': 'wl',
    'fileData': [{
            'name': 'css',
            'type': 'dir'
        },
        {
            'name': 'js',
            'type': 'dir'
        },
        {
            'name': 'images',
            'type': 'dir'
        },
        {
            'name': 'index.html',
            'type': 'file',
            'content': '<html>\n\t<head>\n\t\t<title>title</title>\n\t</head>\n\t<body>\n\t\t<h1>\n\t</h1>\n\t</body>\n</html>',
        }
    ]
};

var fs = require('fs');

if (projectData) {
    var path = 'font-end-automation';
    fs.mkdirSync(path + '/' + projectData.name);

    var fileData = projectData.fileData;

    if (fileData && Array.isArray(fileData)) {
        fileData.forEach(function(f) {
            f.path = path + '/' + projectData.name + '/' + f.name;

            f.content = f.content || '';

            switch (f.type) {
                case 'dir':
                    fs.mkdirSync(f.path);
                    break;

                case 'file':
                    fs.writeFileSync(f.path, f.content);
                    break;

                default:
                    break;
            }
        });
    }
}