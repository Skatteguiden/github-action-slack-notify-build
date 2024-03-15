const repository = {
  name: 'github-action-slack-notify-build',
  owner: {
    login: 'gielfeldt',
  },
};

export const GITHUB_PUSH_EVENT = {
  context: {
    payload: {
      repository,
    },
    ref: 'refs/heads/my-branch',
    workflow: 'CI',
    eventName: 'push',
    sha: 'abc123',
    event: {
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/4096963?s=256&v=4',
      },
    },
  },
};

export const GITHUB_PR_EVENT = {
  context: {
    payload: {
      repository,
      pull_request: {
        html_url: 'https://github.com/Skatteguiden/github-action-slack-notify-build/pulls/1',
        title: 'This is a PR',
        head: {
          ref: 'my-branch',
          sha: 'xyz678',
        },
      },
    },
    workflow: 'CI',
    eventName: 'pull_request',
    sha: 'abc123',
    event: {
      user: {
        avatar_url: 'https://avatars.githubusercontent.com/u/4096963?s=256&v=4',
      },
    },
  },
};
