---
title: "Fifth example post"
category: "demo"
tags: "with-code"
meta: "Fifth example post with text mostly and some code."

---
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet tortor in diam commodo luctus a sit amet tortor. Sed quis massa mollis, eleifend dolor vitae, vulputate nulla. Duis fringilla ultrices sagittis. Quisque sapien dui, auctor eget lectus nec, egestas gravida nisl. Nam pulvinar venenatis orci condimentum posuere.

---
Integer eu est elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi egestas, turpis non cursus pellentesque, risus justo malesuada nunc, ac hendrerit diam nisl ut velit. Donec sollicitudin consequat tincidunt. In sed iaculis nisl. Morbi ac sem non nulla mattis ullamcorper. Ut hendrerit porta rutrum. Integer luctus auctor lacus, eu efficitur nisi pulvinar ac. Nullam dictum vulputate dui id faucibus. Etiam eleifend eget risus sed consequat. Nam dapibus felis feugiat risus accumsan feugiat.

```js
import chain from "lodash";

import getPosts from "./posts";

export default function getTags() {
    const posts = getPosts();
    return chain(posts)
        .map("tags")
        .flatten()
        .groupBy("slug")
        .map((group) => ({ tag: group[0], count: group.length }))
        .orderBy(["count", "tag"], ["desc", "asc"])
        .map((tagGroup) => tagGroup.tag)
        .value();
}
```

Proin dictum eleifend neque eget elementum. Donec rutrum sit amet ante aliquet tristique. Integer ut mi erat. Quisque eu neque quis tortor blandit interdum at id eros. Vestibulum tincidunt tincidunt nisi, non finibus eros volutpat at. Aenean lobortis lacinia lectus eu pharetra. Mauris eget tellus sed ligula scelerisque scelerisque eu sit amet arcu. Etiam quis urna odio. Proin a molestie est, id pharetra massa. Duis ornare, dui ut lobortis pellentesque, purus leo porttitor ex, in finibus tellus dolor ut ante. Duis nec metus nibh. Cras lacinia id diam et commodo. Integer facilisis ornare bibendum. Curabitur euismod arcu risus, ac bibendum nunc iaculis quis. Integer varius eros nec elit fringilla, sed fringilla eros vehicula.

Aliquam blandit finibus velit. Praesent vel lacus gravida, lacinia neque non, tincidunt metus. Phasellus pellentesque in urna sit amet convallis. Nulla vitae sapien non lacus sollicitudin tristique. In hac habitasse platea dictumst. Suspendisse mattis ante eu volutpat interdum. Praesent ullamcorper, augue a ullamcorper porttitor, erat nisl laoreet neque, a dignissim dui odio non leo. Ut sit amet ante at lorem ultricies lobortis.
