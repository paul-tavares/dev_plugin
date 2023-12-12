# Kibana Developer Plugin

A Kibana plugin with utilities to assist with development against the Kibana/Elasticsearch stack


## Installation and Usage

This plugin can be installed into an existing Kibana development setup by adding it to the `<kibana_code>/plugins/` directory. Plugins in this directory are excluded from the Kibana codebase by default.

Here are instructions on how to install it:

1. Ensure that your Kibana develpment environment has been `bootstrap`'d
2. Change directory into the `plugins` directory at the root of your kibana codebase
    ```shell
    cd plugins
    ```
3. Clone this repo _(or your own fork of this repo)_ into the `plugins` directory
    ```shell
    git clone git@github.com:paul-tavares/dev_plugin.git
    ```
   This will create a directory named `dev_plugin` under the `plugins` and clone the source under that directory.
4. Bootstrap the newly installed plugin
    ```shell
    cd dev_plugin
    yarn bootstrap
    ```
5. If Kibana server is already  running, stop and restart it so that it picks up the new plugin
6. From the Kibana UI, you should now see a `Kibana Developer` menu options at the bottom of the Kibana global side menu.



## Development

To Develop against this plugin, follow the normal steps for forking a repo. You can then clone the repo to your local Kibana development environment following the instructions above for Installation and Usage.

Once the plugin has been installed/setup, run the `watcher` so that changes done are built and seend in the UI on the next browser refresh:

```shell
cd plugins/dev_plugin
yarn dev:watch
```


## Scripts

<dl>
  <dt><code>yarn bootstrap</code></dt>
  <dd>Execute this to install node_modules and setup the dependencies in your plugin and in Kibana</dd>

  <dt><code>yarn dev</code></dt>
  <dd>Build the plugin into the <code>target</code> directory, which will also enable Kibana to correctly pickup this plugin when it is started in dev mode.</dd>

  <dt><code>yarn dev:watch</code></dt>
  <dd>Build the plugin anytime the source changes. Use this when developing against this plugin</dd>
</dl>
