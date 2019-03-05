import React, { useState } from 'react';

const screenWidth = 300;
const time = 285;

// various screens
function Abc() {
    const style = {
        background: 'red',
        width: screenWidth,
        flexShrink: 0,
    };
    return <div style={style}>Abc</div>;
}
function Def() {
    const style = {
        background: 'green',
        width: screenWidth,
        flexShrink: 0,
    };
    return <div style={style}>Def</div>;
}

function Xyz() {
    const style = {
        background: 'yellow',
        width: screenWidth,
        flexShrink: 0,
    };
    return <div style={style}>Xyz</div>;
}

// some helper
function getScreen(type) {
    return {
        abc: Abc,
        def: Def,
        xyz: Xyz,
    }[type];
}
function getHeight(type) {
    return {
        abc: 500,
        def: 400,
        xyz: 300,
    }[type];
}

export function ScreenStack() {
    // could be a nice little hook useScreenStack, exposing push, pop, setReturnScreen, ...
    const [stack, setStack] = useState(['abc', 'def', 'xyz']);
    const [viewIndex, setIndex] = useState(stack.length - 1);

    const stackHeigth = getHeight(stack[viewIndex]);
    const stackStyle = {
        position: 'absolute',
        top: 20,
        left: 30,
        alignItems: 'stretch',
        width: screenWidth,
        height: '100%',
        overflow: 'hidden',
        background: 'transparent',
        // transition: `height ${time}ms ease`,
    };
    const style = {
        position: 'absolute',
        display: 'flex',
        left: -viewIndex * screenWidth,
        flex: 1,
        height: stackHeigth,
        transition: `left ${time}ms ease, height ${time}ms ease`,
    };

    const push = newScreen => {
        const newStack = stack.slice();
        newStack.push(newScreen);
        console.log(newStack);
        setStack(newStack);
        setIndex(viewIndex + 1);
    };
    const pop = () => {
        const newStack = stack.slice();
        if (stack.length < 2) return;
        newStack.pop();
        setIndex(viewIndex - 1);
        setTimeout(() => {
            // this could be made a bit better, so index and pop are more in tune
            // if pressed multiple times
            setStack(newStack);
            setIndex(newStack.length - 1);
        }, time);
    };
    const setReturnScreen = returnScreen => {
        const newStack = stack.slice();
        if (newStack.length - 2 < 1) return;
        newStack[newStack.length - 2] = returnScreen;
        setStack(newStack);
    };

    return (
        <>
            <div style={stackStyle}>
                <div style={style}>
                    {stack.map(type => {
                        const Screen = getScreen(type);
                        return <Screen />;
                    })}
                </div>
            </div>
            <div>
                <div>
                    stack {stack} {viewIndex} {getHeight(stack[viewIndex])}
                </div>
                <div onClick={() => push('abc')}>push 'Abc'</div>
                <div onClick={() => push('def')}>push 'Def'</div>
                <div onClick={() => push('xyz')}>push 'Xyz'</div>
                <div onClick={() => setReturnScreen('abc')}>setReturnScreen 'Abc'</div>
                <div onClick={() => setReturnScreen('def')}>setReturnScreen 'Def'</div>
                <div onClick={() => setReturnScreen('xyz')}>setReturnScreen 'Xyz'</div>

                <div onClick={() => pop()}>pop</div>
            </div>
        </>
    );
}
