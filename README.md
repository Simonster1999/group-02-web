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

This is a chore reward application that helps parents create incentives for children to complete daily chores. A parent can set up custom tasks that reward the child with an in-app currency. This currency can then be exchanged for items in a reward shop. Items available in the shop are all created by the parent and represent real-life rewards provided by the parent for the child.

### Pages

* Home

On the home screen, the user can fill out the parent creation form to create a parent account, after which the parent will be listed in the left part of the page. Underneath the list is a button for deleting all parents. It should be noted that this feature, aside from deleting all parents, also deletes all children, quests and rewards tied to those parents, effectively resetting the entire database. As such, it is only available using a secret password. 
Upon creating a parent, the user can log into the parent account using the login form located next to the parent creation form. This takes the user to the parent page.


* Parent Page

When logging into a parent account using the login form on the home page, the user will see their own parent account name with three buttons. These buttons are labeled as "X", "Edit" and "Show Children". The "X" button deletes the parent account along with any children, quests and rewards tied to it. The "Edit" buttong will make a form show up that allows the user to edit the parent's username and password. Finally, the "Show Children" button lists all children tied to that parent, and also brings up the child creation form, which can be used to create a new child account that will be tied to the parent that's currently logged in. 
The child creation form works the same way as the parent creation form, aside from also allowing the user to decide what balance the child will have upon creation.
When the parent has created (a) child account(s), they will be listed in the children list. Each child listed here also comes with "X" and "Edit" buttons, which both function the same as the buttons with the same names on the parent page.


* Manage Quests

The Manage Quests page lets a parent manage quests with features that are only available to the parent. From this view, a parent can log in to their account by pressing the "Show Quests" button. This will prompt them with entering their password. After logging in, the user can use the "Create Quest" button on the right side of the page to access the quest creation form. Pressing "Create" button near the bottom of the form after entering a name, description and a reward number, as well as selecting a date in the calendar shown in the middle of the screen, will create the quest and list it in the quest list. This quest will only be available to the children of that parent account.
When logged into an account, the calendar will glow red on the dates that have available quests. Selecting a date in the calendar will list the quests that were created with that date selected. The quests come with "X" and "Edit" buttons to delete a quest and edit a quest's info.
When a child has completed a quest, it will be shown as "Pending". When a quest is pending, the parent of said child can choose to either accept or deny the quest by using buttons that are only available on pending quests in particular. Pressing the "Accept" button will label the quest "Completed" and will update the child's balance with the reward amount that was listed on said quest. Completed quests will remain in the list of that date for the user to go back and look at later if they so desire.
Pressing the "Deny" button will remove the "Pending" label and return the quest to its uncompleted stage. If the parent deems the quest incomplete, it can therefore be returned to the list of uncompleted quests, so that the child can return to fulfilling the requirements that had not yet been fulfilled.


* Quests

The Quests page looks very similar to the Manage Quests page, but has a list of children instead of parents. Like the Manage Quests page, it has a calendar component in the middle of the page. Each child has their balance displayed under their name, as well as a "Show Quests" button. Pressing it will prompt the user with entering the password of the child account that was selected. Upon entering the password correctly, the quest list will show up next to the calendar. From here, the child can select a date in the calendar. Dates that have quests available glow red, so that the user won't have to search through every date to find a quest. 
All available quests for the selected date will be listed in the quest list along with the quest name, quest description and reward amount. All available quests also has a "Complete" button. Pressing this button will, as mentioned in the Manage Quests page description, put the quest in the pending state. After the parent accepts the child's request of quest completion, the reward amount will be added to the child's balance. If the parent denies the reward, the quest will be returned to the list without adding anything to the child's balance.


* Manage Rewards

This page is where parents create rewards for the children to spend their reward currency on. The page has a list that shows all parents, as well as a reward list. The user can click the "Select" button on any one parent account to view all rewards that parent has created. This prompts the user to enter their password. 
This view also comes with the "Create Reward" button to allow for a parent to create a reward for their children. Pressing it will prompt the user with entering a reward name, description and price.
When a reward has been created, it will be listed in the Rewards list. Each item in the list is either labelled "For sale" or "Sold". When an item is sold, it will also show who it was bought by, so that a parent can keep track of who is going to receive the reward.
All rewards have individual "Delete" and "Edit" buttons. The user can remove a reward from the list or edit its name, description and price using these buttons.
When a parent has handed out a reward to the child that bought it, they can delete it from the list. This allows for an easy way to keep track of what rewards have yet to be handed out, and who shall receive it.

* Rewards

This page shows all rewards that are available to the currently selected child. When selecting a child, the user will be prompted to enter their password, after which, the rewards available to that child will be listed on the right side of the page. Each listed reward shows its name, description and price. A child can press the "Buy" button, which removes the item from the list and deducts the price amount from the selected child's balance. It will then be listed as "Bought by: " followed by the selected child's name in the Manage Rewards view for that child's parent.

### Entity-Relationship (ER) Diagram

![ER Diagram](./images/er_diagram.png)

## Teaser (MS3)

![Teaser](./images/teaser.png)
