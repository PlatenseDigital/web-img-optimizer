module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        options: {
        authors: 'Guido Schmidt / Platense Digital',
        iconUrl: 'https://imageup.me/images/ecd3b0b7-1516-4ee7-8f69-0a4a747cde92.x-icon',
        exe: `web-img-optimizer.exe`,
        name: "web-img-optimizer",
        }
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: 'favicon.png'
      }},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
