import isHotkey from "is-hotkey";
import {
    Editable,
    withReact,
    useSlate,
    Slate,
    useSelected,
    useFocused,
    useSlateStatic,
    ReactEditor,
} from "slate-react";
import {
    Editor,
    Transforms,
    createEditor,
    Descendant,
    Element as SlateElement,
    Text,
    Node,
    Path,
    Range,
} from "slate";

import { withHistory } from "slate-history";
import { useCallback, useContext, useMemo, useState } from "react";
import {
    Button,
    Heading,
    IconButton,
    ListItem,
    OrderedList,
    UnorderedList,
    chakra,
    Box,
    Image,
    Skeleton,
    useColorModeValue,
} from "@chakra-ui/react";

import {
    RiAlignCenter,
    RiAlignJustify,
    RiAlignLeft,
    RiAlignRight,
    RiBold,
    RiCodeView,
    RiDoubleQuotesR,
    RiH1,
    RiH2,
    RiItalic,
    RiListOrdered,
    RiListUnordered,
    RiUnderline,
} from "react-icons/ri";

import escapeHTML from "escape-html";
import { FiTrash } from "react-icons/fi";
import { nanoid } from "nanoid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@lib/firebase";
import { EntitiesContext, useUser } from "@lib/context";

const HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const initialValue = [
    {
        type: "paragraph",
        children: [{ text: "" }],
    },
];

const ChakraEditable = chakra(Editable);

export default function RichTextEditor({ onSubmit }) {
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

    const editor = useMemo(() => {
        const _editor = withHistory(
            withCorrectVoidBehavior(withReact(createEditor()))
        );
        const { isVoid } = _editor;
        _editor.isVoid = (element) => {
            return element.type === "image" ? true : isVoid(element);
        };
        return _editor;
    }, []);

    const [entities, setEntities] = useState({});

    const { userDoc } = useUser();

    return (
        <Slate editor={editor} value={initialValue}>
            <EntitiesContext.Provider value={entities}>
                <ChakraEditable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="Message"
                    spellCheck
                    autoFocus
                    onKeyDown={(event) => {
                        if (isHotkey("enter", event)) {
                            event.preventDefault();
                            onSubmit(
                                JSON.stringify(editor.children),
                                serialzeToRawText(editor.children)
                            );
                            const totalNodes = editor.children.length;
                            for (let i = 0; i < totalNodes - 1; i++) {
                                Transforms.removeNodes(editor, {
                                    at: [totalNodes - i - 1],
                                });
                            }
                            Transforms.insertNodes(editor, initialValue[0], {
                                at: [editor.children.length],
                            });
                            Transforms.removeNodes(editor, {
                                at: [0],
                            });
                        }
                        for (const hotkey in HOTKEYS) {
                            if (isHotkey(hotkey, event)) {
                                event.preventDefault();
                                const mark = HOTKEYS[hotkey];
                                toggleMark(editor, mark);
                            }
                        }
                    }}
                    borderColor={useColorModeValue("gray.200", "gray.600")}
                    borderWidth={2}
                    padding={2}
                    borderRadius="lg"
                    _focus={{
                        borderColor: "brand.500",
                    }}
                    transition="border-color 0.2s"
                    onPaste={(event) => {
                        const transfer = event.clipboardData;
                        if (transfer) {
                            const { files } = transfer;
                            if (files.length > 0) {
                                Array.from(files).forEach(async (file) => {
                                    if (file.type.match("^image/")) {
                                        const id = nanoid();
                                        setEntities((prev) => ({
                                            ...prev,
                                            [id]: {},
                                        }));
                                        Transforms.insertNodes(editor, {
                                            type: "image",
                                            id,
                                            children: [{ text: "" }],
                                        });
                                        const attatchmentsRef = ref(
                                            storage,
                                            `attatchments/${id}`
                                        );

                                        const metadata = {
                                            contentType: file.type,
                                            author: userDoc.username,
                                        };

                                        await uploadBytes(
                                            attatchmentsRef,
                                            file,
                                            metadata
                                        );

                                        const url = await getDownloadURL(
                                            attatchmentsRef
                                        );

                                        setEntities((prev) => ({
                                            ...prev,
                                            [id]: {
                                                url,
                                            },
                                        }));
                                    }
                                });
                            }
                        }
                    }}
                    onDrop={(event) => {
                        event.preventDefault();
                        const files = Array.from(event.dataTransfer.items);
                        files.forEach(async (file) => {
                            if (
                                file.kind === "file" &&
                                file.type.match("^image/")
                            ) {
                                const id = nanoid();
                                setEntities((prev) => ({
                                    ...prev,
                                    [id]: {},
                                }));
                                Transforms.insertNodes(editor, {
                                    type: "image",
                                    id,
                                    children: [{ text: "" }],
                                });
                                const attatchmentsRef = ref(
                                    storage,
                                    `attatchments/${id}`
                                );

                                const metadata = {
                                    contentType: file.type,
                                    author: userDoc.username,
                                };

                                await uploadBytes(
                                    attatchmentsRef,
                                    file.getAsFile(),
                                    metadata
                                );

                                const url = await getDownloadURL(
                                    attatchmentsRef
                                );

                                setEntities((prev) => ({
                                    ...prev,
                                    [id]: {
                                        url,
                                    },
                                }));
                            }
                        });
                        return true;
                    }}
                />
            </EntitiesContext.Provider>
            <MarkButton format="bold" icon={<RiBold />} />
            <MarkButton format="italic" icon={<RiItalic />} />
            <MarkButton format="underline" icon={<RiUnderline />} />
            <MarkButton format="code" icon={<RiCodeView />} />
            <BlockButton format="heading-one" icon={<RiH1 />} />
            <BlockButton format="heading-two" icon={<RiH2 />} />
            <BlockButton format="block-quote" icon={<RiDoubleQuotesR />} />
            <BlockButton format="numbered-list" icon={<RiListOrdered />} />
            <BlockButton format="bulleted-list" icon={<RiListUnordered />} />
            <BlockButton format="left" icon={<RiAlignLeft />} />
            <BlockButton format="center" icon={<RiAlignCenter />} />
            <BlockButton format="right" icon={<RiAlignRight />} />
            <BlockButton format="justify" icon={<RiAlignJustify />} />
        </Slate>
    );
}

const withCorrectVoidBehavior = (editor) => {
    const { deleteBackward, insertSoftBreak } = editor;

    // if current selection is void node, insert a default node below
    editor.insertSoftBreak = () => {
        if (!editor.selection || !Range.isCollapsed(editor.selection)) {
            return insertSoftBreak();
        }

        const selectedNodePath = Path.parent(editor.selection.anchor.path);
        const selectedNode = Node.get(editor, selectedNodePath);
        if (Editor.isVoid(editor, selectedNode)) {
            Editor.insertNode(editor, {
                type: "paragraph",
                children: [{ text: "" }],
            });
            return;
        }

        insertSoftBreak();
    };

    // if prev node is a void node, remove the current node and select the void node
    editor.deleteBackward = (unit) => {
        if (
            !editor.selection ||
            !Range.isCollapsed(editor.selection) ||
            editor.selection.anchor.offset !== 0
        ) {
            return deleteBackward(unit);
        }

        const parentPath = Path.parent(editor.selection.anchor.path);
        const parentNode = Node.get(editor, parentPath);
        const parentIsEmpty = Node.string(parentNode).length === 0;

        if (parentIsEmpty && Path.hasPrevious(parentPath)) {
            const prevNodePath = Path.previous(parentPath);
            const prevNode = Node.get(editor, prevNodePath);
            if (Editor.isVoid(editor, prevNode)) {
                return Transforms.removeNodes(editor);
            }
        }

        deleteBackward(unit);
    };

    return editor;
};

const serialzeToRawText = (nodes) =>
    nodes.map((n) => Node.string(n)).join("\n");

const serializeToHTML = (node) => {
    if (Text.isText(node)) {
        let string = escapeHTML(node.text);
        if (node.bold) string = `<strong>${string}</strong>`;
        if (node.italic) string = `<em>${string}</em>`;
        if (node.underline) string = `<u>${string}</u>`;
        if (node.code) string = `<code>${string}</code>`;

        return string;
    }

    const children = node.children.map((n) => serializeToHTML(n)).join("");

    switch (node.type) {
        case "heading-one":
            return `<h1>{children}</h1>`;
        case "heading-two":
            return `<h2>${children}</h2>`;
        case "block-quote":
            return `<blockquote>${children}</blockquote>`;
        case "numbered-list":
            return `<ol>${children}</ol>`;
        case "bulleted-list":
            return `<ul>${children}</ul>`;
        case "list-item":
            return `<li>${children}</li>`;
        case "left":
            return `<p style="text-align: left;">${children}</p>`;
        case "center":
            return `<p style="text-align: center;">${children}</p>`;
        case "right":
            return `<p style="text-align: right;">${children}</p>`;
        case "justify":
            return `<p style="text-align: justify;">${children}</p>`;
        case "paragraph":
            return `<p>${children}</p>`;
        default:
            return children;
    }
};

const MarkButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <IconButton
            variant="ghost"
            size="sm"
            isActive={isMarkActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
            icon={icon}
        />
    );
};

const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <IconButton
            variant="ghost"
            size="sm"
            isActive={isBlockActive(
                editor,
                format,
                TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
            )}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
            icon={icon}
        />
    );
};

const Element = ({ attributes, children, element }) => {
    const style = { textAlign: element.align };
    switch (element.type) {
        case "image":
            return (
                <ImageElement
                    style={style}
                    attributes={attributes}
                    element={element}
                >
                    {children}
                </ImageElement>
            );
        case "block-quote":
            return (
                <chakra.blockquote
                    style={style}
                    borderLeftWidth={5}
                    borderLeftColor="gray.200"
                    paddingLeft={2}
                    {...attributes}
                >
                    {children}
                </chakra.blockquote>
            );
        case "bulleted-list":
            return (
                <UnorderedList style={style} {...attributes}>
                    {children}
                </UnorderedList>
            );
        case "heading-one":
            return (
                <Heading as="h1" size="xl" style={style} {...attributes}>
                    {children}
                </Heading>
            );
        case "heading-two":
            return (
                <Heading as="h2" size="md" style={style} {...attributes}>
                    {children}
                </Heading>
            );
        case "list-item":
            return (
                <ListItem style={style} {...attributes}>
                    {children}
                </ListItem>
            );
        case "numbered-list":
            return (
                <OrderedList style={style} {...attributes}>
                    {children}
                </OrderedList>
            );
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            );
    }
};

const ImageElement = ({ attributes, children, element, style }) => {
    const selected = useSelected();
    const focused = useFocused();
    const editor = useSlateStatic();
    const path = ReactEditor.findPath(editor, element);

    const entities = useContext(EntitiesContext);

    return (
        <Box {...attributes}>
            {children}
            <Box contentEditable={false} position="relative" style={style}>
                {entities[element.id]?.url ? (
                    <Box position="relative" display="inline-block">
                        <Image
                            src={entities[element.id].url}
                            display="inline-block"
                            maxWidth="100%"
                            maxHeight="25em"
                            shadow={selected && focused ? "outline" : ""}
                            borderRadius="lg"
                            cursor="pointer"
                        />
                        <IconButton
                            as="span"
                            icon={<FiTrash />}
                            size="sm"
                            aria-label="Remove image"
                            position="absolute"
                            top={1.5}
                            left={1.5}
                            display={
                                selected && focused ? "inline-flex" : "none"
                            }
                            onClick={() => {
                                Transforms.removeNodes(editor, { at: path });
                            }}
                        />
                    </Box>
                ) : (
                    <Skeleton height={64} width={64} borderRadius="lg" />
                )}
            </Box>
        </Box>
    );
};

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const isBlockActive = (editor, format, blockType = "type") => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: (n) =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n[blockType] === format,
        })
    );

    return !!match;
};

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
    );
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(n.type) &&
            !TEXT_ALIGN_TYPES.includes(format),
        split: true,
    });
    let newProperties = {};
    if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
            align: isActive ? undefined : format,
        };
    } else {
        newProperties = {
            type: isActive ? "paragraph" : isList ? "list-item" : format,
        };
    }
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};
