from ape import accounts, project

acc = accounts.load("local")
acc.deploy(project.Box)
