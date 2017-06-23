# README

## Export ANDROID variables

### For Terminal
Run exportVariables.osx.sh or manually export variables:

```
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### For vscode
1. go to android directory
1. duplicate "local.properties.template" and change name to "local.properties"
1. replace USERNAME var into the file

## Start application
1. Connect device or start emulator
1. ```react-native run-android```