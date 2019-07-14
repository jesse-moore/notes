# Installation and Management
```bash
apt-get install git
```

#### Setup Name and Email in .gitconfig file in $HOME directory
```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@whatever.com"
```

#### Enables helpful colorization of command line output
```
git config --global color.ui auto
```

#### Setup alias in .gitconfig file
```bash
[alias]
  co = checkout
  ci = commit
  st = status
  br = branch
  hist = log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short
  type = cat-file -t
  dump = cat-file -p
```

#### Setup prompt config files / place in @HOME directory
```
git-completion.bash, git-prompt.sh, .bashrc
```

#### Source urls for git-completion.bash & git-prompt.sh
* https://github.com/git/git/blob/1f1cddd558b54bb0ce19c8ace353fd07b758510d/contrib/completion/git-prompt.sh
* https://github.com/git/git/blob/1f1cddd558b54bb0ce19c8ace353fd07b758510d/contrib/completion/git-completion.bash

# Initializing git Repository (when remote exists)
#### Setup current directory as git repository with optional name
```
git init project_name
```

#### Clone local repo / remote SSH / remote https
``` 
git clone ~/existing/repo ~/new/repo 
git clone git@github.com:username/project.git 
git clone https://github.com/username/project.git 
```

# Initializing git Repository (when remote doesn't exist)
#### Create repository on Github and setup current directory as git repository with optional name
```
git init project_name
```
#### Add Remote Location SSH / HTTPS (alias_name is commonly origin)
```
git remote add alias_name git@github.com:username/project.git
git remote add alias_name https://github.com/username/project.git
```
#### Add file(s) to staging area
```
git add file.ext || git add '*.ext' || git add '*.*'
```
#### Commit file(s)
```
git commit file(s) (if committing separately)
```
#### Push File(s) to Remote SSH / HTTPS
```
git push git://github.com/username/project.git
git push https://github.com/username/project.git
```

# Making changes
```bash
git status #lists all new or modified files to be commited
git diff #shows file differences not yet staged
git diff --staged #shows file differences between staging and the last file version
git mv file.ext destination || new_file.ext #move or rename file
git rm file.ext #deletes the file from the working directory and stages the deletion
git rm --cached file.ext #removes the file from version control but preserves the file locally
git commit -m "Comment"
git add file.ext || git add *.ext || git add *.* #add file(s) to staging area
git reset file.ext #unstages the file, but preserve its contents
git commit -m "Comment" #commit with comment inline
git revert HEAD #undo previous commit
git commit --amend -m "Comment Amend" #amend previous commit)
```
## Undo a commit and redo
```bash
git commit -m "Something terribly misguided"
git reset HEAD~
#<< edit files as necessary >>
git add ...
git commit -c ORIG_HEAD
```
This is what you want to undo.
This leaves your working tree (the state of your files on disk) unchanged but undoes the commit and leaves the changes you committed unstaged (so they'll appear as "Changes not staged for commit" in git status, so you'll need to add them again before committing). If you only want to add more changes to the previous commit, or change the commit message1, you could use git reset --soft HEAD~ instead, which is like git reset HEAD~ (where HEAD~ is the same as HEAD~1) but leaves your existing changes staged.
Make corrections to working tree files.
git add anything that you want to include in your new commit.
Commit the changes, reusing the old commit message. reset copied the old head to .git/ORIG_HEAD; commit with -c ORIG_HEAD will open an editor, which initially contains the log message from the old commit and allows you to edit it. If you do not need to edit the message, you could use the -C option.
Beware however that if you have added any new changes to the index, using commit --amend will add them to your previous commit.

If the code is already pushed to your server and you have permissions to overwrite history (rebase) then:
```bash
git push origin master --force
```
You can also look at this answer:

How to move HEAD back to a previous location? (Detached head)

The above answer will show you git reflog which is used to find out what is the SHA-1 which you wish to revert to. Once you found the point to which you wish to undo to use the sequence of commands as explained above.

Note, however, that you don't need to reset to an earlier commit if you just made a mistake in your commit message. The easier option is to git reset (to upstage any changes you've made since) and then git commit --amend, which will open your default commit message editor pre-populated with the last commit message.
# Synchronizing changes
```bash
git fetch alias_name #downloads all history from the repository
git push alias_name branch_name #uploads all local branch commits to GitHub
git pull #fetch and merge any commits from the remote branch
```

# Branches - creating, switching, merging
```bash
git branch #lists all local branches in the current repository
git branch branch_name #creates new branch
git checkout -b branch_name #creates new branch and switches to the branch
git checkout branch_name #switches to the specified branch and updates the working directory
git push -u origin branch_name #push a new branch for the first time
#update your branch when the original branch from remote repository has been updated
git fetch remote_name
#merge branches
git checkout branch_name #branch to be merged into
git merge branch_name #merge branch into current branch
git branch -d branch_name #deletes the specified branch
#handling merge conflicts
#open conflicted file, edit conflicts
code
#recommit file
git add file.ext
git commit -m "Merged branch fixed conflict"
```
# Git Commands
#### Git Stash
```bash
git stash #temporarily store modified, tracked files in order to change branches
git stash #temporarily stores all modified tracked files
git stash list #lists all stashed changesets
git stash pop #restores the most recently stashed files
git stash drop #discards the most recently stashed changeset
```
#### Git Log
```bash
git log #view history
git log --stat #view commit history with status of files that changed
git man git-log #arguments for git log
git log --pretty=format:'%h %ad | %s%d [%an]' --graph --date=short
--pretty="..." #defines the format of the output.
%h #is the abbreviated hash of the commit
%d #are any decorations on that commit (e.g. branch heads or tags)
%ad #is the author date
%s #is the comment
%an #is the author name
--graph #informs git to display the commit tree in an ASCII graph layout
--date=short #keeps the date format nice and short
git diff [first-branch]...[second-branch] #shows content differences between two branches
git show [commit] #outputs metadata and content changes of the specified commit
```
#### Git Remote
```bash
git remote #manage remote repository
git remote -v #verify remote
git remote rm remote_name #remove remote
git remote rename old_name new_name #rename remote name
```
#### Git Tag
```bash
git tag #display available tags
git tag tag_name #tag current commit
git tag -l tag_name #list tags matching query
git tag -d tag_name #delete tag
```
#### Git Checkout
```bash
git checkout commit_id||branch_name #checkout specific commit number or branch name
git checkout commit #checkout parent of commit
git checkout tag_name #checkout parent of tag
```
#### Git Reset
```bash
git reset #redo commits
git reset commit_id #undoes all commits afer commit_id, preserving changes locally
git reset --hard commit_id #discards all history and changes back to the specified commit
git reset --hard HEAD #restore to the HEAD of your current branch (abort a merge in progress)
```
# Excluding temporary files and paths
Use file .gitignore (for local) and .gitignore_global to suppress versioning of files and paths matching the specified patterns
```bash
ex. .sublime-project
git ls-files --other --ignored --exclude-standard #lists all ignored files in this project
```