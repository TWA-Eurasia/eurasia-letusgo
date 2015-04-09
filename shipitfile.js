/**
 * Created by yfwang on 4/7/15.
 */
module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/github-monitor',
      deployTo: '/tmp/deploy_to',
      repositoryUrl: 'git@github.com:TWA-Eurasia/eurasia-letusgo.git',
      branch: 'uat',
      ignores: ['.git', 'node_modules', '.idea', 'eurasia-letusgo.iml', 'jspm_packages', '.DS_Store'],
      key: 'id_aliyun',
      keepReleases: 2,
      shallowClone: true
    },
    staging: {
      servers: 'root@120.26.45.145'
    }
  });
};
