const { context } = require('@actions/github');

function buildSlackAttachments({ status, color, github }) {
  const { payload, ref, workflow, event, eventName, actor } = github.context;
  console.log(JSON.stringify(github.context, null, 4));
  const { owner, repo } = context.repo;
  const branch = eventName === 'pull_request' ? payload.pull_request.head.ref : ref.replace('refs/heads/', '');

  const sha = eventName === 'pull_request' ? payload.pull_request.head.sha : github.context.sha;
  const runId = parseInt(process.env.GITHUB_RUN_ID, 10);

  const referenceLink =
    eventName === 'pull_request'
      ? {
          title: 'Pull Request',
          value: `<${payload.pull_request.html_url} | ${payload.pull_request.title}>`,
          short: true,
        }
      : {
          title: 'Branch',
          value: `<https://github.com/${owner}/${repo}/commit/${sha} | ${branch}>`,
          short: true,
        };

  const attachments = [
    {
      color,
      fields: [
        {
          title: 'Repo',
          value: `<https://github.com/${owner}/${repo} | ${owner}/${repo}>`,
          short: true,
        },
        {
          title: 'Workflow',
          value: `<https://github.com/${owner}/${repo}/actions/runs/${runId} | ${workflow}>`,
          short: true,
        },
        {
          title: 'Status',
          value: status,
          short: true,
        },
        referenceLink,
        {
          title: 'Event',
          value: eventName,
          short: true,
        },
        {
          title: 'Actor',
          value: actor,
          short: true,
        },
      ],
      footer_icon: 'https://github.githubassets.com/favicon.ico',
      footer: `<https://github.com/${owner}/${repo} | ${owner}/${repo}>`,
      ts: Math.floor(Date.now() / 1000),
    },
  ];

  const icon_url = event.user.avatar_url + '&s=256';
  return {
    attachments,
    icon_url,
  };
}

module.exports.buildSlackAttachments = buildSlackAttachments;

function formatChannelName(channel) {
  return channel.replace(/[#@]/g, '');
}

module.exports.formatChannelName = formatChannelName;
