# Backend and Frontend Template

Latest version: https://git.ita.chalmers.se/courses/dit341/group-00-web (public Github [mirror](https://github.com/dit341/group-00-web))

## Project Structure

| File        | Purpose           | What you do?  |
| ------------- | ------------- | ----- |
| `server/` | Backend server code | All your server code |
| [server/README.md](server/README.md) | Everything about the server | **READ ME** carefully! |
| `client/` | Frontend client code | All your client code |
| [client/README.md](client/README.md) | Everything about the client | **READ ME** carefully! |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Free online production deployment | Deploy your app online in production mode |
| [docs/LOCAL_DEPLOYMENT.md](docs/LOCAL_DEPLOYMENT.md) | Local production deployment | Deploy your app local in production mode |

## Requirements

The version numbers in brackets indicate the tested versions but feel free to use more recent versions.
You can also use alternative tools if you know how to configure them (e.g., Firefox instead of Chrome).

* [Git](https://git-scm.com/) (v2) => [installation instructions](https://www.atlassian.com/git/tutorials/install-git)
  * [Add your Git username and set your email](https://docs.gitlab.com/ce/gitlab-basics/start-using-git.html#add-your-git-username-and-set-your-email)
    * `git config --global user.name "YOUR_USERNAME"` => check `git config --global user.name`
    * `git config --global user.email "email@example.com"` => check `git config --global user.email`
  * > **Windows users**: We recommend to use the [Git Bash](https://www.atlassian.com/git/tutorials/git-bash) shell from your Git installation or the Bash shell from the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to run all shell commands for this project.
* [Chalmers GitLab](https://git.ita.chalmers.se/) => Login with your **Chalmers CID** choosing "Sign in with" **Chalmers Login**. (contact [support@chalmers.se](mailto:support@chalmers.se) if you don't have one)
  * DIT341 course group: https://git.ita.chalmers.se/courses/dit341
  * [Setup SSH key with Gitlab](https://docs.gitlab.com/ee/ssh/)
    * Create an SSH key pair `ssh-keygen -t ed25519 -C "email@example.com"` (skip if you already have one)
    * Add your public SSH key to your Gitlab profile under https://git.ita.chalmers.se/profile/keys
    * Make sure the email you use to commit is registered under https://git.ita.chalmers.se/profile/emails
  * Checkout the [Backend-Frontend](https://git.ita.chalmers.se/courses/dit341/group-00-web) template `git clone git@git.ita.chalmers.se:courses/dit341/group-00-web.git`
* [Server Requirements](./server/README.md#Requirements)
* [Client Requirements](./client/README.md#Requirements)

## Getting started

```bash
# Clone repository
git clone git@git.ita.chalmers.se:courses/dit341/group-00-web.git

# Change into the directory
cd group-00-web

# Setup backend
cd server && npm install
npm run dev

# Setup frontend
cd client && npm install
npm run serve
```

> Check out the detailed instructions for [backend](./server/README.md) and [frontend](./client/README.md).

## Visual Studio Code (VSCode)

Open the `server` and `client` in separate VSCode workspaces or open the combined [backend-frontend.code-workspace](./backend-frontend.code-workspace). Otherwise, workspace-specific settings don't work properly.

## System Definition (MS0)

### Purpose

This is a chore reward application that helps parents create incentives for children to complete daily chores. A parent can set up custom tasks that reward the child with an in-app currency. This currency can then be exchanged for items in a shop. Items available in the shop are all created by the parent and represent real-life rewards provided by the parent for the child.

### Pages

* Home

On the home screen, the user can choose to create a parent. This prompts them to choose a username and account password. After filling out the parent creation form, the parent will be listed in the left part of the page. This list has functionality for deleting a parent and editing a parent, as well as showing the children that are tied to the parent. 
Pressing the "Show children" button presents the user with a form for creating a new child account which, upon creation, will be tied to the currently selected parent account. The user selects a username, password and balance for the child account before finally pressing the "Create"-button, after which it will be listed in the second list to the right of the parent list. This list contains buttons for deleting and editing each child account that is tied to the currently selected parent.


* Manage Quests

The parent quest page allows a parent to create quests that will be available to their children. A user can press the "Show Quests"-button on any parent to display the quests that have been created by that parent. The user can then also create a quest on the rightmost part of the page. Pressing the "Create quest"-button will present a form where the user can enter quest details before pressing the add button to add it into the selected parent's list. Each object in the list can be edited or deleted.


* Quests

The child quest page displays a list of children on the left side, with buttons for displaying that child's available quests in the second list on the right side. The page has a calendar in the middle, and its currently selected date will determine what quests are shown on the right side based on the date they were created. The list of available quests has a "Complete"-button for each quest that marks the quest as completed and adds that quest's reward amount to the child's balance.


* Manage Rewards

This page is where parents create rewards for the children to spend their reward currency on. Creating a reward adds it into the list of rewards that are available to that parent's children. The user can edit and delete each reward from this page. When a reward is bought, this page will show what child bought the reward. That way, a parent can keep track of what real-life rewards shall be awarded to whom.

* Rewards

This page shows all rewards that are available to the currently selected child. The list shows rewards that have a parent ID equal to the parent ID of the child. 
From here, the children can select a reward and press the "Buy"-button. This will subtract the price of the reward from the child's balance and set the item to bought, removing it from the list of available rewards. If a child's balance is too low to buy a reward, they will be alerted that they don't have enough to buy it. The item will then remain on the list and the child's balance will remain the same as before attempting to buy it.

### Entity-Relationship (ER) Diagram

![ER Diagram](./images/er_diagram.png)

## Teaser (MS3)

![Teaser](./images/teaser.png)
