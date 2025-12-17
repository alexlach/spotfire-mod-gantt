import { Controls, ModProperty } from "spotfire/spotfire-api-1-2";

export function createScalePopout(
    controls: Controls,
    overdue: ModProperty<boolean>,
    weekend: ModProperty<boolean>,
    sortByDate: ModProperty<boolean>,
    popoutClosedEventEmitter: any
) {
    const { checkbox } = controls.popout.components;
    const { section } = controls.popout;

    /**
     * Popout content
     */
    const is = (property: ModProperty) => (value: any) => property.value() == value;

    const popoutContent = () => [
        section({
            children: [
                checkbox({
                    name: overdue.name,
                    text: "Show overdue tasks",
                    checked: is(overdue)(true),
                    enabled: true
                })
            ]
        }),
        section({
            children: [
                checkbox({
                    name: weekend.name,
                    text: "Show weekend",
                    checked: is(weekend)(true),
                    enabled: true
                })
            ]
        }),
        section({
            children: [
                checkbox({
                    name: sortByDate.name,
                    text: "Sort by start date",
                    checked: is(sortByDate)(true),
                    enabled: true
                })
            ]
        })
    ];

    return function show(x: number, y: number) {
        controls.popout.show(
            {
                x: x,
                y: y,
                autoClose: true,
                alignment: "Bottom",
                onChange: (event) => {
                    const { name, value } = event;
                    name == overdue.name && overdue.set(value);
                    name == weekend.name && weekend.set(value);
                    name == sortByDate.name && sortByDate.set(value);
                },
                onClosed: () => {
                    popoutClosedEventEmitter.emit("popoutClosed");
                }
            },
            popoutContent
        );
    };
}
