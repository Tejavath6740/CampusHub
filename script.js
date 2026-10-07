const KEY = "college-club-management-v3";

/* =========================================================
   INITIAL DATA
========================================================= */

const seed = {
    uid: 20,

    clubs: [
        {
            id: 1,
            name: "Coding Club",
            cat: "Technical",
            desc: "Hackathons, DSA and web development sessions"
        },
        {
            id: 2,
            name: "Cultural Club",
            cat: "Arts",
            desc: "Dance, music and drama activities"
        },
        {
            id: 3,
            name: "NSS Unit",
            cat: "Social",
            desc: "Community service and social activities"
        },
        {
            id: 4,
            name: "Robotics Club",
            cat: "Technical",
            desc: "Robotics, IoT and automation projects"
        }
    ],

    members: [
               {
            id: 1,
            name: "Ram charan",
            roll: "24B81A6731",
            clubs: [1, 4]
        },
               {
            id: 2,
            name: "Revath",
            roll: "24B81A6732",
            clubs: [2, 4]
        },
               {
            id: 3,
            name: "Ruthvik",
            roll: "24B81A6734",
            clubs: [3, 4]
        },
               {
            id: 4,
            name: "Sai Ganesh",
            roll: "24B81A6738",
            clubs: [4, 4]
        },
               {
            id: 5,
            name: "A.Sai Ganesh",
            roll: "24B81A6739",
            clubs: [1, 4]
        }
        {
            id: 6,
            name: "Sai Krishna",
            roll: "24B81A6740",
            clubs: [2, 4]
        },
        {
            id: 7,
            name: "Sai Rohith",
            roll: "24B81A6742",
            clubs: [3, 3]
        },
        {
            id: 8,
            name: "Sai Srineesh",
            roll: "24B81A6743",
            clubs: [1]
        },
                   {
            id: 9,
            name: "Sai Sujith",
            roll: "24B81A6744",
            clubs: [3,3]
        },
                              {
            id: 10,
            name: "Sai Varshith",
            roll: "24B81A6745",
            clubs: [3,3]
        }
    ],

    events: [
        {
            id: 8,
            club: 1,
            title: "24-Hour Hackathon",
            date: "2026-10-18",
            venue: "Main Lab",
            cap: 30
        },
        {
            id: 9,
            club: 2,
            title: "Annual Fest Auditions",
            date: "2026-10-12",
            venue: "College Auditorium",
            cap: 50
        },
        {
            id: 10,
            club: 3,
            title: "Blood Donation Camp",
            date: "2026-10-25",
            venue: "Seminar Hall",
            cap: 40
        }
    ],

    regs: [
        {
            e: 8,
            m: 5,
            att: false
        },
        {
            e: 9,
            m: 6,
            att: false
        }
    ]
};


/* =========================================================
   LOAD DATA
========================================================= */

let S;

try {
    S = JSON.parse(localStorage.getItem(KEY));
} catch (error) {
    S = null;
}

if (!S || !S.clubs || !S.members || !S.events) {
    S = JSON.parse(JSON.stringify(seed));
}


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let tab = "Dashboard";

let me = S.members.length
    ? S.members[0].id
    : null;


/* =========================================================
   SHORTCUTS
========================================================= */

const $ = id => document.getElementById(id);


/* =========================================================
   SAVE DATA
========================================================= */

function save() {

    try {
        localStorage.setItem(
            KEY,
            JSON.stringify(S)
        );
    } catch (error) {
        console.error(
            "Could not save data:",
            error
        );
    }
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function esc(value) {

    return String(value ?? "").replace(
        /[&<>"]/g,
        char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;"
        }[char])
    );
}


/* =========================================================
   FIND CLUB
========================================================= */

function club(id) {

    return (
        S.clubs.find(
            c => c.id == id
        ) || {
            name: "Unknown Club",
            cat: "Unknown"
        }
    );
}


/* =========================================================
   FIND MEMBER
========================================================= */

function mem(id) {

    return S.members.find(
        m => m.id == id
    );
}


/* =========================================================
   COUNT EVENT REGISTRATIONS
========================================================= */

function countRegistrations(eventId) {

    return S.regs.filter(
        registration =>
            registration.e == eventId
    ).length;
}


/* =========================================================
   GENERATE ID
========================================================= */

function next() {

    S.uid++;

    return S.uid;
}


/* =========================================================
   FORM HELPER
========================================================= */

function formElements(event) {

    event.preventDefault();

    return event.target.elements;
}


/* =========================================================
   NAVIGATION
========================================================= */

const pages = [
    {
        name: "Dashboard",
        icon: "📊"
    },
    {
        name: "Clubs",
        icon: "🏫"
    },
    {
        name: "Events",
        icon: "📅"
    },
    {
        name: "Members",
        icon: "👨‍🎓"
    },
    {
        name: "Attendance",
        icon: "✅"
    }
];


function renderNavigation() {

    $("nav").innerHTML = pages
        .map(
            page => `
                <button
                    class="${
                        page.name === tab
                            ? "on"
                            : ""
                    }"
                    onclick="
                        tab='${page.name}';
                        render();
                    "
                >
                    ${page.icon}
                    &nbsp;
                    ${page.name}
                </button>
            `
        )
        .join("");
}


/* =========================================================
   MAIN RENDER
========================================================= */

function render() {

    /* User dropdown */

    if ($("me")) {

        $("me").innerHTML =
            S.members.length

            ? S.members
                .map(
                    member => `
                        <option
                            value="${member.id}"
                            ${
                                member.id == me
                                    ? "selected"
                                    : ""
                            }
                        >
                            ${esc(member.name)}
                        </option>
                    `
                )
                .join("")

            : `
                <option value="">
                    No students
                </option>
            `;
    }


    /* Navigation */

    if ($("nav")) {
        renderNavigation();
    }


    /* Page title */

    if ($("pageTitle")) {
        $("pageTitle").textContent = tab;
    }


    /* Page content */

    if ($("v")) {

        if (V[tab]) {
            $("v").innerHTML = V[tab]();
        }
    }
}


/* =========================================================
   PAGE VIEWS
========================================================= */

const V = {


    /* =====================================================
       DASHBOARD
    ===================================================== */

    Dashboard() {

        const events =
            [...S.events].sort(
                (a, b) =>
                    a.date.localeCompare(
                        b.date
                    )
            );


        const attendance =
            S.regs.filter(
                r => r.att
            ).length;


        const attendanceRate =
            S.regs.length

                ? Math.round(
                    attendance /
                    S.regs.length *
                    100
                )

                : 0;


        return `

            <!-- Statistics -->

            <div class="g">

                <div class="c">

                    <div class="n">
                        ${S.clubs.length}
                    </div>

                    <div class="sub">
                        🏫 Active Clubs
                    </div>

                </div>


                <div class="c">

                    <div class="n">
                        ${S.members.length}
                    </div>

                    <div class="sub">
                        👨‍🎓 Students
                    </div>

                </div>


                <div class="c">

                    <div class="n">
                        ${S.events.length}
                    </div>

                    <div class="sub">
                        📅 Total Events
                    </div>

                </div>


                <div class="c">

                    <div class="n">
                        ${attendanceRate}%
                    </div>

                    <div class="sub">
                        ✅ Attendance Rate
                    </div>

                </div>

            </div>


            <!-- Upcoming Events -->

            <div style="margin-top:30px">

                <div class="section-header">

                    <div>
                        <h2>
                            Upcoming College Events
                        </h2>

                        <p class="sub">
                            Latest activities and programs
                        </p>
                    </div>

                </div>


                <div class="g">

                    ${
                        events.length

                        ? events.map(
                            event => `

                                <div class="c">

                                    <span class="tag">
                                        ${esc(
                                            club(
                                                event.club
                                            ).cat
                                        )}
                                    </span>

                                    <h3>
                                        ${esc(
                                            event.title
                                        )}
                                    </h3>

                                    <div class="sub">
                                        🏫
                                        ${esc(
                                            club(
                                                event.club
                                            ).name
                                        )}
                                    </div>

                                    <div class="sub">
                                        📅
                                        ${event.date}
                                    </div>

                                    <div class="sub">
                                        📍
                                        ${esc(
                                            event.venue
                                        )}
                                    </div>


                                    <div class="bar">

                                        <i
                                            style="
                                                width:
                                                ${
                                                    Math.min(
                                                        100,
                                                        countRegistrations(
                                                            event.id
                                                        ) /
                                                        event.cap *
                                                        100
                                                    )
                                                }%
                                            "
                                        ></i>

                                    </div>


                                    <div class="row">

                                        <span class="sub">

                                            ${
                                                countRegistrations(
                                                    event.id
                                                )
                                            }

                                            /

                                            ${event.cap}

                                            registered

                                        </span>

                                    </div>

                                </div>

                            `
                        ).join("")

                        : `
                            <div class="c empty">
                                No upcoming events.
                            </div>
                        `
                    }

                </div>

            </div>
        `;
    },


    /* =====================================================
       CLUBS
    ===================================================== */

    Clubs() {

        return `

            <div class="section-header">

                <div>
                    <h2>
                        College Clubs
                    </h2>

                    <p class="sub">
                        Create and manage college student clubs.
                    </p>
                </div>

            </div>


            <form
                onsubmit="addClub(event)"
            >

                <input
                    name="n"
                    placeholder="Club name"
                    required
                >


                <input
                    name="c"
                    placeholder="Category"
                    required
                >


                <input
                    name="d"
                    placeholder="Club description"
                >


                <button class="b">
                    + Add Club
                </button>

            </form>


            <div class="g">

                ${
                    S.clubs.length

                    ? S.clubs.map(
                        c => {

                            const members =
                                S.members.filter(
                                    member =>
                                        member.clubs.includes(
                                            c.id
                                        )
                                );


                            const joined =
                                members.some(
                                    member =>
                                        member.id == me
                                );


                            return `

                                <div class="c">

                                    <span class="tag">
                                        ${esc(
                                            c.cat
                                        )}
                                    </span>


                                    <h3>
                                        ${esc(
                                            c.name
                                        )}
                                    </h3>


                                    <div class="sub">
                                        ${esc(
                                            c.desc ||
                                            "No description"
                                        )}
                                    </div>


                                    <div class="row">

                                        <span class="sub">

                                            👥
                                            ${members.length}
                                            members

                                        </span>


                                        <span>

                                            <button
                                                class="
                                                    b
                                                    ${
                                                        joined
                                                            ? "s"
                                                            : ""
                                                    }
                                                "
                                                onclick="
                                                    toggleJoin(
                                                        ${c.id}
                                                    )
                                                "
                                            >
                                                ${
                                                    joined
                                                        ? "Leave"
                                                        : "Join"
                                                }
                                            </button>


                                            <button
                                                class="b s"
                                                onclick="
                                                    delClub(
                                                        ${c.id}
                                                    )
                                                "
                                            >
                                                🗑
                                            </button>

                                        </span>

                                    </div>

                                </div>

                            `;
                        }
                    ).join("")

                    : `
                        <div class="c empty">
                            No clubs created yet.
                        </div>
                    `
                }

            </div>
        `;
    },


    /* =====================================================
       EVENTS
    ===================================================== */

    Events() {

        return `

            <div class="section-header">

                <div>

                    <h2>
                        College Events
                    </h2>

                    <p class="sub">
                        Manage events organized by college clubs.
                    </p>

                </div>

            </div>


            <form
                onsubmit="addEvent(event)"
            >

                <input
                    name="t"
                    placeholder="Event title"
                    required
                >


                <select name="c">

                    ${
                        S.clubs.map(
                            c => `
                                <option
                                    value="${c.id}"
                                >
                                    ${esc(
                                        c.name
                                    )}
                                </option>
                            `
                        ).join("")
                    }

                </select>


                <input
                    name="d"
                    type="date"
                    required
                >


                <input
                    name="v"
                    placeholder="Venue"
                    required
                >


                <input
                    name="p"
                    type="number"
                    min="1"
                    value="50"
                    placeholder="Capacity"
                >


                <button class="b">
                    + Add Event
                </button>

            </form>


            <div class="g">

                ${
                    S.events.length

                    ? S.events.map(
                        event => {

                            const registered =
                                countRegistrations(
                                    event.id
                                );


                            const isRegistered =
                                S.regs.some(
                                    registration =>
                                        registration.e ==
                                            event.id &&
                                        registration.m ==
                                            me
                                );


                            const full =
                                registered >=
                                event.cap;


                            return `

                                <div class="c">

                                    <span class="tag">
                                        ${esc(
                                            club(
                                                event.club
                                            ).name
                                        )}
                                    </span>


                                    <h3>
                                        ${esc(
                                            event.title
                                        )}
                                    </h3>


                                    <div class="sub">
                                        📅
                                        ${event.date}
                                    </div>


                                    <div class="sub">
                                        📍
                                        ${esc(
                                            event.venue
                                        )}
                                    </div>


                                    <div class="bar">

                                        <i
                                            style="
                                                width:
                                                ${
                                                    Math.min(
                                                        100,
                                                        registered /
                                                        event.cap *
                                                        100
                                                    )
                                                }%
                                            "
                                        ></i>

                                    </div>


                                    <div class="row">

                                        <span class="sub">

                                            ${registered}
                                            /
                                            ${event.cap}

                                            ${
                                                full
                                                    ? " · Full"
                                                    : " · Available"
                                            }

                                        </span>


                                        <span>

                                            <button
                                                class="
                                                    b
                                                    ${
                                                        isRegistered
                                                            ? "s"
                                                            : ""
                                                    }
                                                "
                                                ${
                                                    full &&
                                                    !isRegistered
                                                        ? "disabled"
                                                        : ""
                                                }
                                                onclick="
                                                    toggleReg(
                                                        ${event.id}
                                                    )
                                                "
                                            >

                                                ${
                                                    isRegistered
                                                        ? "Cancel"
                                                        : "Register"
                                                }

                                            </button>


                                            <button
                                                class="b s"
                                                onclick="
                                                    delEvent(
                                                        ${event.id}
                                                    )
                                                "
                                            >
                                                🗑
                                            </button>

                                        </span>

                                    </div>

                                </div>

                            `;
                        }
                    ).join("")

                    : `
                        <div class="c empty">
                            No events created yet.
                        </div>
                    `
                }

            </div>
        `;
    },


    /* =====================================================
       MEMBERS / STUDENTS
    ===================================================== */

    Members() {

        return `

            <div class="section-header">

                <div>

                    <h2>
                        College Students
                    </h2>

                    <p class="sub">
                        Add, edit and delete students participating
                        in college clubs.
                    </p>

                </div>


                <button
                    class="b"
                    onclick="showStudentForm()"
                >
                    + Add Student
                </button>

            </div>


            <div id="studentFormContainer"></div>


            <div class="ov">

                <table>

                    <thead>

                        <tr>

                            <th>
                                Student
                            </th>

                            <th>
                                Roll Number
                            </th>

                            <th>
                                Clubs
                            </th>

                            <th>
                                Events
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${
                            S.members.length

                            ? S.members.map(
                                member => `

                                    <tr>

                                        <td>

                                            <strong>
                                                ${esc(
                                                    member.name
                                                )}
                                            </strong>

                                        </td>


                                        <td>
                                            ${esc(
                                                member.roll
                                            )}
                                        </td>


                                        <td>

                                            ${
                                                member.clubs.length

                                                ? member.clubs
                                                    .map(
                                                        clubId =>
                                                            `
                                                            <span class="tag">
                                                                ${esc(
                                                                    club(
                                                                        clubId
                                                                    ).name
                                                                )}
                                                            </span>
                                                            `
                                                    )
                                                    .join("")

                                                : `
                                                    <span class="sub">
                                                        No clubs
                                                    </span>
                                                `
                                            }

                                        </td>


                                        <td>

                                            ${
                                                S.regs.filter(
                                                    registration =>
                                                        registration.m ==
                                                        member.id
                                                ).length
                                            }

                                        </td>


                                        <td>

                                            <button
                                                class="b s"
                                                onclick="
                                                    editStudent(
                                                        ${member.id}
                                                    )
                                                "
                                            >
                                                ✏️ Edit
                                            </button>


                                            <button
                                                class="
                                                    b
                                                    danger
                                                "
                                                onclick="
                                                    deleteStudent(
                                                        ${member.id}
                                                    )
                                                "
                                            >
                                                🗑 Delete
                                            </button>

                                        </td>

                                    </tr>

                                `
                            ).join("")

                            : `
                                <tr>

                                    <td
                                        colspan="5"
                                        class="empty"
                                    >
                                        No students added yet.
                                    </td>

                                </tr>
                            `
                        }

                    </tbody>

                </table>

            </div>
        `;
    },


    /* =====================================================
       ATTENDANCE
    ===================================================== */

    Attendance() {

        if (!S.events.length) {

            return `
                <div class="c empty">
                    No events available.
                </div>
            `;
        }


        return S.events.map(
            event => {

                const registrations =
                    S.regs.filter(
                        registration =>
                            registration.e ==
                            event.id
                    );


                const present =
                    registrations.filter(
                        registration =>
                            registration.att
                    ).length;


                return `

                    <div
                        class="c"
                        style="margin-bottom:14px"
                    >

                        <div class="row">

                            <div>

                                <span class="tag">
                                    ${event.date}
                                </span>


                                <h3>
                                    ${esc(
                                        event.title
                                    )}
                                </h3>

                            </div>


                            <span class="sub">

                                ${present}
                                /
                                ${registrations.length}

                                present

                            </span>

                        </div>


                        ${
                            registrations.length

                            ? registrations.map(
                                registration => {

                                    const member =
                                        mem(
                                            registration.m
                                        );


                                    return `

                                        <div class="row">

                                            <span>
                                                👤
                                                ${esc(
                                                    member?.name ||
                                                    "Unknown Student"
                                                )}
                                            </span>


                                            <button
                                                class="
                                                    b
                                                    ${
                                                        registration.att
                                                            ? ""
                                                            : "s"
                                                    }
                                                "
                                                onclick="
                                                    mark(
                                                        ${event.id},
                                                        ${registration.m}
                                                    )
                                                "
                                            >

                                                ${
                                                    registration.att
                                                        ? "✓ Present"
                                                        : "Mark Present"
                                                }

                                            </button>

                                        </div>

                                    `;
                                }
                            ).join("")

                            : `
                                <div class="sub">
                                    No students registered
                                    for this event.
                                </div>
                            `
                        }

                    </div>
                `;
            }
        ).join("");
    }
};


/* =========================================================
   CLUB FUNCTIONS
========================================================= */


/* Add Club */

function addClub(event) {

    const x =
        formElements(event);


    const name =
        x.n.value.trim();

    const category =
        x.c.value.trim();

    const description =
        x.d.value.trim();


    if (!name || !category) {

        alert(
            "Please enter club name and category."
        );

        return;
    }


    S.clubs.push({

        id: next(),

        name: name,

        cat: category,

        desc: description

    });


    save();

    render();
}


/* Delete Club */

function delClub(id) {

    const selectedClub =
        S.clubs.find(
            c => c.id == id
        );


    if (!selectedClub) return;


    const confirmDelete =
        confirm(
            `Delete "${selectedClub.name}"?

This will also delete:
• Club memberships
• Club events
• Event registrations
• Attendance records`
        );


    if (!confirmDelete) {
        return;
    }


    const eventIds =
        S.events
            .filter(
                event =>
                    event.club == id
            )
            .map(
                event =>
                    event.id
            );


    /* Delete club */

    S.clubs =
        S.clubs.filter(
            club =>
                club.id != id
        );


    /* Delete club events */

    S.events =
        S.events.filter(
            event =>
                event.club != id
        );


    /* Delete registrations */

    S.regs =
        S.regs.filter(
            registration =>
                !eventIds.includes(
                    registration.e
                )
        );


    /* Remove club from students */

    S.members.forEach(
        member => {

            member.clubs =
                member.clubs.filter(
                    clubId =>
                        clubId != id
                );

        }
    );


    save();

    render();
}


/* Join / Leave Club */

function toggleJoin(id) {

    if (!me) {

        alert(
            "Please add a student first."
        );

        return;
    }


    const member =
        mem(me);


    if (!member) return;


    if (
        member.clubs.includes(id)
    ) {

        member.clubs =
            member.clubs.filter(
                clubId =>
                    clubId != id
            );

    } else {

        member.clubs.push(id);

    }


    save();

    render();
}


/* =========================================================
   EVENT FUNCTIONS
========================================================= */


/* Add Event */

function addEvent(event) {

    const x =
        formElements(event);


    if (!S.clubs.length) {

        alert(
            "Please create a club before adding an event."
        );

        return;
    }


    S.events.push({

        id: next(),

        club:
            Number(x.c.value),

        title:
            x.t.value.trim(),

        date:
            x.d.value,

        venue:
            x.v.value.trim(),

        cap:
            Number(x.p.value) || 50

    });


    save();

    render();
}


/* Delete Event */

function delEvent(id) {

    const event =
        S.events.find(
            e => e.id == id
        );


    if (!event) return;


    if (
        !confirm(
            `Delete "${event.title}"?

All registrations and attendance
records for this event will also
be deleted.`
        )
    ) {

        return;
    }


    S.events =
        S.events.filter(
            event =>
                event.id != id
        );


    S.regs =
        S.regs.filter(
            registration =>
                registration.e != id
        );


    save();

    render();
}


/* Register / Cancel */

function toggleReg(id) {

    if (!me) {

        alert(
            "Please add a student before registering."
        );

        return;
    }


    const index =
        S.regs.findIndex(
            registration =>
                registration.e == id &&
                registration.m == me
        );


    if (index >= 0) {

        S.regs.splice(
            index,
            1
        );

    } else {

        const event =
            S.events.find(
                event =>
                    event.id == id
            );


        if (!event) return;


        const registered =
            countRegistrations(id);


        if (
            registered >=
            event.cap
        ) {

            alert(
                "This event is already full."
            );

            return;
        }


        S.regs.push({

            e: id,

            m: me,

            att: false

        });

    }


    save();

    render();
}


/* =========================================================
   STUDENT MANAGEMENT
========================================================= */


/* Show Add Student Form */

function showStudentForm(
    student = null
) {

    const container =
        document.getElementById(
            "studentFormContainer"
        );


    if (!container) return;


    container.innerHTML = `

        <div class="c student-form">

            <div class="row">

                <div>

                    <h3>
                        ${
                            student
                                ? "Edit Student"
                                : "Add New Student"
                        }
                    </h3>

                    <p class="sub">
                        Enter the student's college details.
                    </p>

                </div>


                <button
                    class="b s"
                    onclick="
                        closeStudentForm()
                    "
                >
                    ✕
                </button>

            </div>


            <form
                onsubmit="
                    ${
                        student

                            ? `updateStudent(
                                event,
                                ${student.id}
                            )`

                            : `saveStudent(event)`
                    }
                "
            >

                <input
                    name="name"
                    placeholder="Student full name"
                    value="${
                        student
                            ? esc(student.name)
                            : ""
                    }"
                    required
                >


                <input
                    name="roll"
                    placeholder="College roll number"
                    value="${
                        student
                            ? esc(student.roll)
                            : ""
                    }"
                    required
                >


                <button
                    class="b"
                    type="submit"
                >

                    ${
                        student
                            ? "💾 Update Student"
                            : "➕ Add Student"
                    }

                </button>

            </form>

        </div>
    `;
}


/* Close Student Form */

function closeStudentForm() {

    const container =
        document.getElementById(
            "studentFormContainer"
        );


    if (container) {

        container.innerHTML =
            "";

    }
}


/* Save New Student */

function saveStudent(event) {

    const x =
        formElements(event);


    const name =
        x.name.value.trim();

    const roll =
        x.roll.value.trim();


    if (!name || !roll) {

        alert(
            "Please enter the student's name and roll number."
        );

        return;
    }


    /* Duplicate Roll Number */

    const duplicate =
        S.members.some(
            member =>
                member.roll.toLowerCase() ===
                roll.toLowerCase()
        );


    if (duplicate) {

        alert(
            "A student with this roll number already exists."
        );

        return;
    }


    S.members.push({

        id: next(),

        name: name,

        roll: roll,

        clubs: []

    });


    save();

    render();
}


/* Edit Student */

function editStudent(id) {

    const student =
        S.members.find(
            member =>
                member.id == id
        );


    if (!student) return;


    showStudentForm(student);
}


/* Update Student */

function updateStudent(
    event,
    id
) {

    const x =
        formElements(event);


    const name =
        x.name.value.trim();

    const roll =
        x.roll.value.trim();


    if (!name || !roll) {

        alert(
            "Please enter the student's name and roll number."
        );

        return;
    }


    /* Check duplicate roll number */

    const duplicate =
        S.members.some(
            member =>
                member.id != id &&
                member.roll.toLowerCase() ===
                roll.toLowerCase()
        );


    if (duplicate) {

        alert(
            "Another student already has this roll number."
        );

        return;
    }


    const student =
        S.members.find(
            member =>
                member.id == id
        );


    if (!student) return;


    student.name =
        name;

    student.roll =
        roll;


    save();

    render();
}


/* Delete Student */

function deleteStudent(id) {

    const student =
        S.members.find(
            member =>
                member.id == id
        );


    if (!student) return;


    const registeredEvents =
        S.regs.filter(
            registration =>
                registration.m == id
        ).length;


    const message =
        registeredEvents > 0

        ? `Delete ${student.name}?

This will also remove:

• Club memberships
• ${registeredEvents} event registration(s)
• Attendance records`

        : `Delete ${student.name} from the college club system?`;


    if (!confirm(message)) {
        return;
    }


    /* Delete student */

    S.members =
        S.members.filter(
            member =>
                member.id != id
        );


    /* Delete registrations */

    S.regs =
        S.regs.filter(
            registration =>
                registration.m != id
        );


    /* Change acting student */

    if (me == id) {

        me =
            S.members.length
                ? S.members[0].id
                : null;
    }


    save();

    render();
}


/* =========================================================
   ATTENDANCE
========================================================= */

function mark(
    eventId,
    memberId
) {

    const registration =
        S.regs.find(
            registration =>
                registration.e ==
                    eventId &&
                registration.m ==
                    memberId
        );


    if (!registration) {

        alert(
            "This student is not registered for the event."
        );

        return;
    }


    registration.att =
        !registration.att;


    save();

    render();
}


/* =========================================================
   ACTING USER
========================================================= */

if ($("me")) {

    $("me").onchange =
        event => {

            me =
                Number(
                    event.target.value
                );

            render();
        };
}


/* =========================================================
   INITIALIZE APPLICATION
========================================================= */

render();
