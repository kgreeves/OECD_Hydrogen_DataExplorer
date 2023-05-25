# OECD Hydrogen Project (Data Explorer)
Summary: 

A web-based data visualization tool for the [2022 IEA Hydrogen Projects](https://www.iea.org/data-and-statistics/data-product/hydrogen-projects-database) dataset modeled on the collection of International Energy Agency (IEA) Data Explorer pages. The data is [freely available](https://www.iea.org/data-and-statistics/data-product/hydrogen-projects-database) as a .csv file. This dataset was selected as there was no current [IEA Data Explorer](https://www.iea.org/data-and-statistics) page associated with it nor an [OECD API](https://data.oecd.org/searchresults/?hf=20&b=0&r=f/type/datasets/api+access&l=en) to access these data.

This project reads the .csv files and stores the data in a Postgres tables (e.g. project_table, reference_table, etc.) This makes the integration to the Dash application more robust. Figures are generated using the [Plotly Python Graphing Library](https://plotly.com/python/).
***
```diff
! This is not an officially IEA-sponsored dashboard, and simply and exercise to generate similar content.
! Any interpretation or representation of the data is exclusively my own (@kgreeves).
```
![https://github.com/kgreeves/OECD_Hydrogen_DataExplorer/blob/master/README_FILES/images/Screenshot_00.png](https://github.com/kgreeves/OECD_Hydrogen_DataExplorer/blob/master/README_FILES/images/Screenshot_00.png)
***


## Screenshots
As the data are stored in a local Postgres database, the following offers a quick look at the Data Explorer and how a user will use the web interface.

In the IEA 2022 Hydrogen Projects Data Explorer, there are two example figures that were generated. The first is a histogram that allows the user to visualize all projects by intended end use. The histogram can be based on users' choice to filter projects by publication (currently only 2022 data), country, technology and project status.
## Status by End Use and Dynamic Reference Table
![https://github.com/kgreeves/OECD_Hydrogen_DataExplorer/blob/master/README_FILES/images/Screenshot_01.png](https://github.com/kgreeves/OECD_Hydrogen_DataExplorer/blob/master/README_FILES/images/Screenshot_01.png)

As the histogram is updated, a table below listing the references associated with each project is updated to correspond with the criteria of the filtered search.References that have an associated webpage contain live links to bring the user directly to the reference.
Reference lists taiolred to the user's can be generated and downloaded on-the-fly upon the click of the download button above the reference table. This allows the user to have a tailored reference list for the version of table she/he/they is currently observing.


## Project Distribution by IAE Estimated Normalized Capacity [nm3 H2/hour]
The second plot breaks down the data to visualize distributions of different products (as described in the datasets) based on the IAE Estimated Normalized Capacity. To more easily view the distributions, please note that the normalized capacities are reported here as log[capacity]

The user has the ability to hide and show each distributions to be able to compare between projects producing different products. Here, for example, it is clear that projects producing ammonia and methane (CH4) have generally non-overlapping distributions whereas synfuel projects span normalized capacities in both of these distributions.

Although it is currently not implemented, this figure could be extended to filter using similar criteria as in Figure 1 (i.e. country, technology, status).

![https://github.com/kgreeves/OECD_Hydrogen_DataExplorer/blob/master/README_FILES/images/Screenshot_02.png](https://github.com/kgreeves/OECD_Hydrogen_DataExplorer/blob/master/README_FILES/images/Screenshot_02.png)




