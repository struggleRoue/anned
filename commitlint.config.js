module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', [
            "feat", "fix", 'readme', 'init'
        ]],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
    }
};