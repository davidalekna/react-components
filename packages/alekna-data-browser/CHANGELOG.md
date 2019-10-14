# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),

## [1.1.0] - 2017-06-20

### Added

- componentDidUpdate will check for initialColumnFlex equality and call `replaceColumnFlex` fn if it changes with the new value

### Changed

- withDataBrowser hoc utils were injected under `dataBrowser` props, now they are spread along other component props

### Removed
