module.exports = {
    apps: [
        {
            name: "Logs Example",
            script: "./server.js",
            watch: false,
            env_staging: {
                "PORT": process.env.PORT || 5001,
                "NODE_ENV": "development"
            },
            env_production: {
                "PORT": process.env.PORT || 5001,
                "NODE_ENV": "production",
            }
        }
    ]
}