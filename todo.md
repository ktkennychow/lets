# Progress Training Tracker

## V0.1 Features

- [x] a way to add exercise
  - [x] an input for name
    - [x] clear after adding
    - [x] required, throw error message if empty
    - [x] auto complete
      - [x] popular exercises
      - [x] allow custom name
  - [x] integrate with the display
    - [x] integrated button to add an exercise
      - [x] modal pop up
        - [x] name
        - [x] note
  - [x] a way to edit exercise
    - [x] edit name
    - [x] edit note
  - [x] an input for notes
    - [x] clear after adding
  - [x] a confirm button
- [x] a way to add record
  - [x] a drop down to specify exercise
  - [x] an input for added weight
    - [x] reset after adding
    - [x] default at 0
    - [x] default from the last record if exist
    - [x] minimum 0 and max 300
  - [x] a way to edit record
    - [x] edit set
    - [x] edit rep
    - [x] edit weight
    - [ ] edit date?
  - [x] an input for reps
    - [x] reset after adding
    - [x] default at 1
    - [x] default from the last record if exist
    - [x] minimum 1 and max 30
  - [x] an input for reps
    - [x] reset after adding
    - [x] default at 1
    - [x] default from the last record if exist
    - [x] minimum 1 and max 10
- [x] a display for exercise & record
  - [x] display exercises
  - [x] display records
  - [x] display last 4 records only
    - [ ] display the latest record on the right on overscroll
- [x] a way to delete exercise
  - [x] a button to delete exercise
  - [x] delete function
    - [x] Confirmation before deletion
- [x] a way to delete record
  - [x] a button to delete record
  - [x] delete function
    - [x] Confirmation before deletion
- [x] a way to persist data
  - [x] a way to save added exercise
  - [x] a way to save added records
  - [x] a way to load saved exercise
  - [x] a way to load saved records

## V0.2 Features

- [] turn into a SPA
  - [] 1 - current Progress page
    - [x] show only the most recent record
  - [] 2 - Start an exercise page
  - [] 3 - History page

## Bugs

- [x] new record is added twice when handleAddRecord is called
- [x] negative reps and negative added weight are allowed
- [x] Adding record to the first new exercise added after emptying exercises crushes
- [x] crashes if there is no existing "train-right-data" JSON in localstorge

## Design Rules

- [] users should be able to do any desire action in 3 clicks
- [] minimalistic design encourage action, more approachable for beginners
