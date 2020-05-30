<?php
$screenshots = array(
    1 => array(
        'image' => '1-login.png',
        'desc' =>  '<p>A login system for a user to fill in their username and password for logging in, to gain access to a restricted area.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Remembers the previous page the user attempted to access, and will automatically redirect the user back to that page upon successful login.</li>
                    <li>User-specific redirects. (User\'s <em>Redirect URL</em> setting in their Profile).  For example, a person&mdash;responsible for managing users only&mdash;can have their profile setup to always redirect them to the User Manager automatically upon logging in.</li>
                    </ul>',
    ),
    2 => array(
        'image' => '2-control-panel.png',
        'desc' => '<p>The "start-screen" for the back-end administration area, with friendly graphic (icons) navigation menu of shortcuts to important (and common) areas of the back-end.</p>',
    ),
    3 => array(
        'image' => '3-settings.png',
        'desc' =>  '<p>An area for configuring the settings of the main configuration file.  Configure settings such as <em>Site Name</em>, <em>Site Email(s)</em>, <em>Database</em>, etc.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>The powerful ability to add and remove settings directly from the configuration file. (Be careful)</li>
                    </ul>',
    ),
    4 => array(
        'image' => '4-settings-2.png',
        'desc' => '<p>In addition, you can configure the <em>Controls</em> (certain On/Off switches of the core), <em>Language Variables</em>, <em>RegEx Patterns</em> (for field validation), and more...</p>',
    ),
    5 => array(
        'image' => '5-users.png',
        'desc' =>  '<p>Users can be created/added (and edited or deleted) to the CMS, for the front-end and/or back-end.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Ajax-driven search/filtering gadget.  Useful for large-scale websites that have hundreds (or thousands) of users.</li>
                    <li>Graphical (icon) markers, and associated legend.</li>
                    </ul>',
    ),
    6 => array(
        'image' => '6-users-settings.png',
        'desc' => '<p>The Users system has a configuration file as well (similar to the core Settings system), and&mdash;of course&mdash;can be configured.</p>',
    ),
    7 => array(
        'image' => '7-users-edit_user.png',
        'desc' => '<p>Editing a user.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li><em>Access Level</em> can be set for the user, to allow access to certain areas of the website.</li>
                    </ul>',
    ),
    8 => array(
        'image' => '8-media.png',
        'desc' => '<p>Media manager for browsing and editing the folders and files of the server.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Configure an ignore list for folder, files.</li>
                    <li>Multiple media managers on a single page.</li>
                    <li>Quick-navigation dropdown select of all folders and sub-folders.</li>
                    </ul>',
    ),
    9 => array(
        'image' => '9-media-quick_navigate.png',
        'desc' => '<p>Quick-navigation gadget (dropdown select) to quicly navigate to any folder and/or sub-folder.</p>',
    ),
    10 => array(
        'image' => '10-media-browse_folder.png',
        'desc' => '<p>Browsing (Open) a folder.</p>',
    ),
    11 => array(
        'image' => '11-media-browse_file.png',
        'desc' => '<p>Browsing (Open) a file.</p>',
    ),
    12 => array(
        'image' => '12-media-edit_file.png',
        'desc' => '<p>Editing an opened file.</p>',
    ),
    13 => array(
        'image' => '13-templates.png',
        'desc' => '<p>Templates (used to format/style and display the GUI aspects of the site) can be created/added (and edited or deleted) to the CMS, as well can be page-specific.  Templates use special HTML variables for displaying the component (and modules (in module positions)) of the page.</p>',
    ),
    14 => array(
        'image' => '14-templates-settings.png',
        'desc' => '<p>The Templates system has a configuration file as well.</p>',
    ),
    15 => array(
        'image' => '15-templates-edit.png',
        'desc' => '<p>Editing a template; Using direct-links to open the HTML and CSS files (in media manager) of the template.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Direct-link is provided for browsing all files (in media manager) of the template\'s folder.</li>
                    </ul>',
    ),
    16 => array(
        'image' => '16-templates-edit-pages.png',
        'desc' => '<p>Assigning the template to pages specifically.</p>',
    ),
    17 => array(
        'image' => '17-modules.png',
        'desc' => '<p>Modules (an important/core part of the CMS) can be created/added (and edited or delete). </p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Mass-check gadget for publishing, unpublishing, and deleting.</li>
                    <li>Graphical (icon) markers for Modules\' types; along with a legend.</li>
                    <li>Column for quick public/unpublish control gadget.</li>
                    </ul>',
    ),
    18 => array(
        'image' => '18-modules-settings.png',
        'desc' => '<p>The Modules system has a configuration file.</p>',
    ),
    19 => array(
        'image' => '19-modules-edit.png',
        'desc' => '<p>Editing a module.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li><em>Component</em> can be set for displaying the component instead.</li>
                    <li>Wrapper (Before and After) HTML can be written/wrapped around the module\'s output content.</li>
                    </ul>',
    ),
    20 => array(
        'image' => '20-modules-edit-pages.png',
        'desc' => '<p>Modules can be page-specific.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Mass-check gadget for assigning to specific pages.</li>
                    <li>Column for quick-link to (exit, and) edit the page.</li>
                    </ul>',
    ),
    21 => array(
        'image' => '21-components.png',
        'desc' => '<p>Control-panel page for accessing other component management areas.</p>',
    ),
    22 => array(
        'image' => '22-components-rb_head.png',
        'desc' => '<p>Manage the rbHead\'s items, creating/adding (editing or deleting) code blocks(snippets)/scripts to the &lt;head&gt; area of the website\'s HTML template.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Mass-check for publishing, unpublishing, and deleting.</li>
                    <li>List-by-page for searching/filtering the list by page.</li>
                    <li>Mass-check-by-name for mass-check.</li>
                    <li>Column for quick public/unpublish control.</li>
                    </ul>',
    ),
    23 => array(
        'image' => '23-components-rb_head-settings.png',
        'desc' => '<p>The rbHead system (component) has a configuration file.</p>',
    ),
    24 => array(
        'image' => '24-components-rb_head-list_by_page.png',
        'desc' => '<p>List-by-page is useful for narrowing down the listing (of items) to a specific page.</p>',
    ),
    25 => array(
        'image' => '25-components-rb_head-mass_check_by_name.png',
        'desc' => '<p>Mass-check-by-name is useful for large-scale sites that have many items of the same parent/part/area, such as "Portfolio:" for example.</p>',
    ),
    26 => array(
        'image' => '26-components-rb_head-edit_item.png',
        'desc' => '<p>Editing an rbHead item; Set the name, publishing status, and content.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Can be page-specific.</li>
                    <li>Can be assigned to multiple modules.</li>
                    </ul>',
    ),
    27 => array(
        'image' => '27-components-rb_head-edit_item-pages.png',
        'desc' => '<p>rbHead item can be page-specific.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Mass-check gadget for assigning to specific pages.</li>
                    <li>Mass-check-by-url for mass-check.</li>
                    <li>Column for quick-link to (exit, and) edit the page.</li>
                    </ul>',
    ),
    28 => array(
        'image' => '28-components-rb_head-edit_item-pages-mass_check_by_url.png',
        'desc' => '<p>Mass-check-by-url is useful for large-scale sites that use a parent/child/segment URL pattern and have many items of the same parent/segment/area, such as "portfolio/" for example.</p>',
    ),
    29 => array(
        'image' => '29-components-rb_head-edit_item-modules.png',
        'desc' => '<p>rbHead item can be assigned to multiple modules, and be module-specific.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Mass-check gadget for assigning to multiple (and/or specific) modules.</li>
                    <li>Column for quick-link to (exit, and) edit the module.</li>
                    </ul>',
    ),
    30 => array(
        'image' => '30-components-rb_content.png',
        'desc' => '<p>Manage the rbContent\'s items, creating/adding (editing or deleting) code blocks(snippets)/content to the body(content) area of the page.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Mass-check for publishing, unpublishing, and deleting.</li>
                    <li>List-by-page for searching/filtering the list by page.</li>
                    <li>Mass-check-by-name for mass-check.</li>
                    <li>Column for quick public/unpublish control.</li>
                    </ul>',
    ),
    31 => array(
        'image' => '31-components-rb_content-settings.png',
        'desc' => '<p>The rbContent system has a configuration file.</p>',
    ),
    32 => array(
        'image' => '32-components-rb_content-list_by_page.png',
        'desc' => '<p>Narrow down the listing (of items) to a specific page.</p>',
    ),
    33 => array(
        'image' => '33-components-rb_content-mass_check_by_name.png',
        'desc' => '<p>Filter the list of items by parent/part/area, such as "Portfolio:" for example.</p>',
    ),
    34 => array(
        'image' => '34-components-rb_content-edit_item.png',
        'desc' => '<p>Editing an rbContent item; Set the name, title, publishing status, and content (or component).</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Can be page-specific.</li>
                    <li>Can be assigned to multiple modules.</li>
                    </ul>',
    ),
    35 => array(
        'image' => '35-components-rb_content-edit_item-pages.png',
        'desc' => '<p>rbContent item can be page-specific.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Mass-check gadget for assigning to specific pages.</li>
                    <li>Mass-check-by-url for mass-check.</li>
                    <li>Column for quick-link to (exit, and) edit the page.</li>
                    </ul>',
    ),
    36 => array(
        'image' => '36-components-rb_content-edit_item-pages-mass_check_by_url.png',
        'desc' => '<p>Mass-check-by-url is useful for large-scale sites that use a parent/child/segment URL pattern and have many items of the same parent/segment/area, such as "portfolio/" for example.</p>',
    ),
    37 => array(
        'image' => '37-components-rb_content-edit_item-modules.png',
        'desc' => '<p>rbContent item can be assigned to multiple modules.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Mass-check gadget for assigning to multiple (and/or specific) modules.</li>
                    <li>Column for quick-link to (exit, and) edit the module.</li>
                    </ul>',
    ),
    38 => array(
        'image' => '38-components-rb_crumb.png',
        'desc' => '<p>rbCrumb system for displaying a "bread crumbs" trail (pathway/chain of pages) a visitor browses.</p>',
    ),
    39 => array(
        'image' => '39-components-rb_crumb-settings.png',
        'desc' => '<p>The rbCrumb system (component) has a configuration file.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Enable/disable the starting("Home") crumb.</li>
                    <li>Enable/disable crumb linking.</li>
                    <li>Customize the the starting crumb\'s name.</li>
                    <li>Customizecrumb separator("&raquo;").</li>
                    </ul>',
    ),
    40 => array(
        'image' => '40-components-rb_menu.png',
        'desc' => '<p>Manage the rbMenu\'s items, creating/adding (editing or deleting) code blocks(snippets)/scripts to the &lt;head&gt; area of the website\'s HTML template.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Mass-check for publishing, unpublishing, and deleting.</li>
                    <li>List-by-page for searching/filtering the list by page.</li>
                    <li>Mass-check-by-name for mass-check.</li>
                    <li>Column for quick public/unpublish control.</li>
                    </ul>',
    ),
    41 => array(
        'image' => '41-components-rb_menu-settings.png',
        'desc' => '<p>The rbMenu system (component) has a configuration file.</p>',
    ),
    42 => array(
        'image' => '42-components-rb_menu-list_by_page.png',
        'desc' => '<p>Narrow down the listing (of items) to a specific page.</p>',
    ),
    43 => array(
        'image' => '43-components-rb_menu-edit_item.png',
        'desc' => '<p>Editing an rbMenu item; Set the name, button name, publishing status, and content.  For SEO, you can customize the title, URL, id name, class name, rel, and target.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Can be page-specific.</li>
                    <li>Can be assigned to multiple modules.</li>
                    </ul>',
    ),
    44 => array(
        'image' => '44-components-rb_menu-edit_item-2.png',
        'desc' => '<p>Editing an rbMenu item, you can also set Wrapper (Before and After) HTML.</p>',
    ),
    45 => array(
        'image' => '45-components-rb_menu-edit_item-pages.png',
        'desc' => '<p>rbMenu item can be page-specific.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Mass-check gadget for assigning to specific pages.</li>
                    <li>Mass-check-by-url for mass-check.</li>
                    <li>Column for quick-link to (exit, and) edit the page.</li>
                    </ul>',
    ),
    46 => array(
        'image' => '46-components-rb_menu-edit_item-pages-mass_check_by_url.png',
        'desc' => '<p>Mass-check-by-url filtering by any parent/child/segment URL pattern.</p>',
    ),
    47 => array(
        'image' => '47-components-rb_menu-edit_item-modules.png',
        'desc' => '<p>rbContent item can be assigned to multiple modules.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Mass-check gadget for assigning to multiple (and/or specific) modules.</li>
                    <li>Column for quick-link to (exit, and) edit the module.</li>
                    </ul>',
    ),
    48 => array(
        'image' => '48-components-rb_language.png',
        'desc' => '<p>rbLanguage system provides multilingual functionality.  Translated content using text variables, and automatic SEF-URL switcher (dropdown select) gadget.</p>',
    ),
    49 => array(
        'image' => '49-components-rb_language-settings.png',
        'desc' => '<p>The rbLanguage system (component) has a configuration file.  Set the default language, and edit and/or add new languages.</p>',
    ),
    50 => array(
        'image' => '50-pages.png',
        'desc' => '<p>Manage the Pages, creating/adding (editing or deleting) Pages/URLs to the website.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Mass-check for publishing, unpublishing, and deleting.</li>
                    <li>List-by-url for searching/filtering the list by a parent/child/segment URL pattern.</li>
                    <li>Mass-check-by-url filtering by any parent/child/segment URL pattern.</li>
                    <li>Column for quick public/unpublish control.</li>
                    <li>Graphical (icon) markers for Modules\' types; along with a legend.</li>
                    <li>Color-coded rows (table-listing) based on page\'s type/access.  Colors: Green(for Home), and Red(for Admin).</li>
                    </ul>',
    ),
    51 => array(
        'image' => '51-pages-2.png',
        'desc' => '<p>Green color-coded row (table-listed item) for "Home" page.</p>',
    ),
    52 => array(
        'image' => '52-pages-3.png',
        'desc' => '<p>Graphic (icon) marker legend.</p>',
    ),
    53 => array(
        'image' => '53-pages-tooltips.png',
        'desc' => '<p>Tooltip information for the gadgets.</p>',
    ),
    54 => array(
        'image' => '54-pages-list_by_url.png',
        'desc' => '<p>Narrow down the listing (of items) to a parent/child/segment URL pattern.</p>',
    ),
    55 => array(
        'image' => '55-pages-mass_check_by_url.png',
        'desc' => '<p>Mass-check-by-url filtering by any parent/child/segment URL pattern.</p>',
    ),
    56 => array(
        'image' => '56-pages-edit_page.png',
        'desc' => '<p>Editing a Page; Set the name, button name, publishing status, and content.  For SEO, you can customizethe URL (to be SEF);  In addition, you can set the META title, description and keywords.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Can be template-specific.</li>
                    <li>Field/label tooltip information.</li>
                    </ul>',
    ),
    57 => array(
        'image' => '57-pages-edit_page-modules.png',
        'desc' => '<p>Managing specific modules, and specific items.</p>
                    <p><strong>Feature(s):</strong></p>
                    <ul>
                    <li>Set/Copy from Page gadget for quick-setup of typical collection of modules(and their items) for a different (yet similar) page.</li>
                    <li>Mass-check gadget for including multiple (and/or specific) modules.</li>
                    <li>Column for quick-link to (exit, and) edit that particular module.</li>
                    <li>Extensive tooltip information.</li>
                    <li>Re-ordering gadget (up/down arrow controls).</li>
                    </ul>',
    ),
    58 => array(
        'image' => '58-pages-edit_page-modules-set_copy_from_page.png',
        'desc' => '<p>Select a page that is similar in it\'s setup of modules(and their items), and quickly copy/save from it.</p>',
    ),
    59 => array(
        'image' => '59-pages-edit_page-modules-tooltip.png',
        'desc' => '<p>Tooltip information for the Set/Copy from Page gadget.</p>',
    ),
    60 => array(
        'image' => '60-pages-edit_page-modules-tooltip-2.png',
        'desc' => '<p>Module item label (table-listed) tooltip information.</p>',
    ),
    61 => array(
        'image' => '61-pages-edit_page-modules-tooltip-3.png',
        'desc' => '<p>Module item count (#) tooltip information.</p>',
    ),
    62 => array(
        'image' => '62-pages-edit_page-modules-tooltip-4.png',
        'desc' => '<p>Module item "edit items" tooltip information.</p>',
    ),
    63 => array(
        'image' => '63-pages-edit_page-modules-tooltip-5.png',
        'desc' => '<p>Module item type (component) tooltip information.</p>',
    ),
    64 => array(
        'image' => '64-pages-edit_page-modules-tooltip-6.png',
        'desc' => '<p>Module item position (for template) tooltip information.</p>',
    ),
    65 => array(
        'image' => '65-pages-edit_page-modules-tooltip-7.png',
        'desc' => '<p>Module item re-order upwards (icon) tooltip information.</p>',
    ),
    66 => array(
        'image' => '66-pages-edit_page-modules-tooltip-8.png',
        'desc' => '<p>Module item re-order downwards (icon) tooltip information.</p>',
    ),
    67 => array(
        'image' => '67-pages-edit_page-modules-tooltip-9.png',
        'desc' => '<p>Module item quick-edit link tooltip information.</p>',
    ),
    68 => array(
        'image' => '68-pages-edit_page-modules-head_items-list.png',
        'desc' => '<p>Managing the module item\'s items for the page.</p>',
    ),
);

function rb_draw_screenshot($idx, $odd = 1, $gallery = 'gallery', $link_only = 0) { 
    global $screenshots;
    $filename = $screenshots[$idx]['image'];
    $image = 'images/screenshots/'.$filename;
    $thumbnail = 'images/screenshots/sml/'.$filename;
    $title = $filename;
    $description = $screenshots[$idx]['desc'];
    // $description = substr($description, 0, 256) .'.'; // Debug
    $title = preg_replace('/^\d+-/', '', $title);
    $title = preg_replace('/-(\d+)(\.[a-z]+)$/', '-(Part $1)$2', $title);
    $title = preg_replace('/(-\d+)?\.[a-z]+$/', '', $title);
    $title = str_replace('_', ' ', $title);
    $title = str_replace('-', ' - ', $title);
    $title = ucwords($title);
    $title = str_replace('Control - Panel', 'Control Panel', $title);
    $title = preg_replace('/Rb ([A-Z][a-z]+)/', 'rb_$1', $title);
    $classname = ($odd == 1) ? 'image-left' : 'image-right';
    $div_classname = ($odd == 1) ? 'odd' : 'even';
    $output = '';
    if (!$link_only) { 
        $output.=
        '<div class="ss '.$div_classname.'">'.
        '<h3>'.$title.'</h3>'.
        '<div class="'.$classname.'">';
    }
    $output .= '<a href="'.$image.'" title="'.$title.' (screen)" rel="lightbox'.($gallery ? "[$gallery]" : '').'"><img src="'.$thumbnail.'" alt="'.$title.'" class="image" /></a>';
    if (!$link_only) { 
        $output .=
        '</div>'
        .$description.
        '<div class="clear"></div>' . 
        '</div>';
    }
    
    return $output;
}