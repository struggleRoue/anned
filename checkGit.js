const simpleGit = require('simple-git');
const git = simpleGit();

git.diffSummary(['--cached']).then(
    diffSummary => {
        const ignoreFilterList = ['package.lock.json'];
        const changes = {
            insertions: 0,
            deletions: 0,
            fileCounts: 0
        }
        diffSummary.files.forEach(item => {
            const isIgnore = ignoreFilterList.includes(item.file);
            if (!isIgnore){
                changes.insertions += item.insertions;
                changes.deletions += item.deletions;
                changes.fileCounts += 1;
            }
        })
        const codeChange = changes.insertions + changes.deletions;
        if (codeChange > 400){
            console.log(
                `每次commit修改的行数不能大于400行，请避免积攒大量修改；
                此次设计到${changes.fileCounts}个文件修改；
                新增${changes.insertions}行，删除${changes.deletions}行;
                共计改动${codeChange}行；
                `
            )
            process.exit(1);
        }
    }
)