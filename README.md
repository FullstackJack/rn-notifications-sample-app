# Overview

The following repo is an example of a notification feature within a chat application.

## Technologies Used

### React Native

This application is built with React Native, a cross-platform iOS and Android framework.

### TypeScript

TypeScript is used to provide typesafety to reduce runtime errors and improve developer experience.

### Jest

Unit Tests are written with TypeScript and Jest. You can run them with `yarn test` or `npm test`.

### Redux

Application state is being managed by Redux, a robust and battle-tested immutability architecture for reactive app state updates. This application makes use state slicing for feature development (i.e. notifications, profile, messages, etc.).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Running in development mode

To run the application locally, use the below mentioned commands.

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see the new app running in the _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run the app — you can also run it directly from within Android Studio and Xcode respectively.

# Project Architecture

## Common

Common code can be found under `src/common/*`, that will include things like `data` files, `ui` components, and `utils`.

## Modules

Modules are used to encapsulate the applications features (e.g. `friends`, `home`, `messages`, `notifications`, `profile`).

Each module should contain a consistent directory structure of `ui` components, `data` files, utility `helpers`, container `screens`, and `ui` components.

### Component Directories

In most cases each component should be in a nested directory named after the component. For instance if your component is named `MyComponent.tsx`, that should live in a directory named `MyComponent`. In the same directory, a sibling test file should be named similarly such as `MyComponent.test.tsx`. Eventually, with use of other development tools such as Storybook, there would be other files such as `MyComponent.stories.tsx` and `MyComponent.fixtures.tsx` also within the same directory.

### Index files

Index files should be present in most directories to make importing ESM module paths use less lengthy. For implementation files, you should export one default export. For index files, you should rewrite that default export as a named export like so:

`export {default as MyComponent} from './MyComponent';`

In lower levels, you can now rely on primarily named exports which work better with intellisense.

`import {MyComponent, MyOtherComponent} from 'ui';`

# Challenges Experienced

## Layout Shift for New Notifications

The nofifications are designed to be updated in the UI when a user presses the "Show # New Notifications" button that appears at the bottom of the notifications screen when new notifications have arrived, but are not yet visible. Since notifications prepend from the top of the scrolling list, this functionality was implemented to avoid layout shift while a user is interacting with the notifications (i.e. marking them as read, accepting a friend invite, etc.).

Originally, I had devised an implementation whereby new notifications appeared when a user was scrolled to the top, similar to a reversed direction chat application, but this was not optimal and caused unintentional layout shifts while interacting with notification items. It became obvious that I needed to switch to a deliberate user action in order to trigger viewing the hidden notifications (merging a hidden list of recieved notifications with the visible ones). That change also necessitated the use of a _new notifications count_ to display the number hidden notifications waiting for the user to engage with.

## List Re-rendering

Despite the name, "VirtualizedList", the underlying implementation in FlatList and SectionList, can still have poor performance when the list is large. I solved around this issue by making use of React's `memo` to memoize the list items and only render/rerender items that have changed. For instance, when a read flag is updated, rather than triggering a whole list rerender, `memo` only let's the parent update the single item that changed.

Further complicating the logic, timeago should needs to be re-rendered periodically. One way to make this work is to unmount the notifications screen on blur and rerender items on next view. Another techique is to add the timeago to the props of the memoization which favors rerendering of more recent items. If we had hundreds of recent items though, this could become a rendering bottleneck and would need to be tuned.

# What TODO Next

1. Push Notifications - Notifications should be deeply integrated with push notifications so they can be received when the app is backgrounded, inactive, or foregrounded. When a user opens a push notification, it should mark it as read, even if the action takes the user to a deep-linked screen.
2. i18n - locale and language support
3. CI/CD - GitHub Actions, FastLane, App Store setup
4. Storybook - develop a library of reusable UI components
5. Themes - Dark/Light Mode, etc.
6. Optimizations - additional optimizations to caching and memory management (e.g. limiting number of notifiations in-memory, persiting data to disk)
7. Build flavoring - Configs for environments
8. Responsive Design - The app should reflow for many different device dimensions and orientations
9. Networking detection (Offline mode) - The app should work in offline mode
10. UI States - All screens should have the complete set of UI states (empty state, partial state/loading state, perfect state, error state)
11. Deep linking - Push notifiations should be deep linkable into various screens to take the user directly to content such as a message or a friend request.
12. More tests - Test coverage is not as high as I like and I have not covered all branches well enough, this is primarily due to time.
