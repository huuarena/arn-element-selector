# arn-element-selector

[https://github.com/huuarena/arn-element-selector](https://github.com/huuarena/arn-element-selector)

A simple library that detects the element selector.

## Instantiation:

    yarn add arn-element-selector
    # or
    npm install arn-element-selector

## Usage:

Import module:

    import 'arn-element-selector'

Add a button with id:

    <button id="arn-els-btn">Open new tab</button>

Main function:

    window.ARN_ELS_MAIN({
        className: 'btn-element-selector',  // required
        host: 'http://example.com',    // required
        originDomain: 'http://example.com', // required
        callback: (data) => console.log('data :>> ', data), // required
    })

## Customization:

## License:

MIT, see the source.
