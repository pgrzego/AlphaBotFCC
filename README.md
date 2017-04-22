# AlphaBotFCC

Slack Bot made as a project for one of the [cohorts](https://tropicalchancer.github.io/projectus/).

The idea is to start a bot which will ask a Slack user a series of yes or no questions to determine the final advice. Each question depends on the previous answer.

The bot can handle different questionaires. The example file (`questions.json`) has a set of them. With the current behavior, the bot randomly chooses one and begins asking questions.

# Installation guide

...

# Technical description

## Questions data model

The data model is in a JSON format and it is an array of objects. Each object inside this array represents a questionnaire. The graph of questions is represented with fields in the questionnaire object. The starting question is found in 'q' property. Then, the question which should be asked when user answers "yes" is stored in 'qy' field while the one for "no" answer is in 'qn' field. For each step further the field is appended with 'y' for "yes" and 'n' for "no". 

# To Do

1. Manage when the user responds 'no' to the first question
2. Enrich the method which handles natural language processing, so it will recognize broader range of answers
3. Allow private conversations with the bot (forcing user to address bot for every answer is kind of annoying)