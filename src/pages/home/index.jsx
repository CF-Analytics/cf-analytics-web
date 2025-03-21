import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";
import {Spinner, Tab, Tabs} from "@heroui/react";

import api from "@/api/api.js";

import ScrollAnimComponent from "@/common/components/scrollAnim/index.jsx";

const Home = () => {
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        const data = await api.getStatistics();
        if (!data) {
            return;
        }

        setDataList(data);
        setLoading(false);
    }

    const parseTooltipName = (value, name) => {
        let newValue = value;
        let newName = name;

        switch (name) {
            case 'requests':
                newName = '总请求';
                break;
            case 'cachedRequests':
                newName = '已缓存请求';
                break;
            case 'bytes':
                newName = '总流量';
                newValue = (value / 1000).toFixed(2) + ' KB';
                break;
            case 'cachedBytes':
                newName = '已缓存流量';
                newValue = (value / 1000).toFixed(2) + ' KB';
                break;
            case 'uniques':
                newName = '唯一访问者';
                break;
        }

        return [newValue, newName];
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
            <div className="h-screen text-white flex flex-col items-center snap-start">
                <div className="grow-3 flex flex-col justify-center items-center">
                    <span className="font-bold text-2xl md:text-5xl">Cloudflare Analytics</span>
                </div>

                <div className="grow flex flex-row justify-center">
                    {loading ? (
                        <div className="h-min flex flex-row items-center light">
                            <Spinner color="default" size="sm"/>
                            <span className="text-sm ml-4">数据加载中...</span>
                        </div>
                    ) : <ScrollAnimComponent/>}
                </div>
            </div>

            {dataList.map(item => (
                <div key={item.zoneName}
                     className="w-[calc(100vw-20px)] md:max-w-[900px] m-auto h-screen flex flex-col justify-center snap-start">
                    <span className="text-white text-2xl ml-2 mb-14">域名：{item.zoneName}</span>

                    <Tabs aria-label="Options" className="dark ml-2">
                        <Tab key={item.zoneName + '0'} title="请求">
                            <div className="h-[30vh] md:h-[50vh]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={item.data}>
                                        <defs>
                                            <linearGradient id="colorRequests" x1="0%" y1="0%" x2="0%" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorCachedRequests" x1="0%" y1="0%" x2="0%" y2="1">
                                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>

                                        <XAxis hide dataKey="formattedTime"/>
                                        <YAxis hide/>

                                        <CartesianGrid strokeDasharray="3 3"/>

                                        <Tooltip
                                            wrapperClassName="text-xs"
                                            labelClassName="whitespace-pre-wrap"
                                            formatter={(value, name) => parseTooltipName(value, name)}/>

                                        <Area type="monotone" dataKey="requests" stroke="#8884d8" fillOpacity={1}
                                              fill="url(#colorRequests)"/>
                                        <Area type="monotone" dataKey="cachedRequests" stroke="#82ca9d"
                                              fillOpacity={1}
                                              fill="url(#colorCachedRequests)"/>
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Tab>

                        <Tab key={item.zoneName + '1'} title="流量">
                            <div className="h-[30vh] md:h-[50vh]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={item.data}>
                                        <defs>
                                            <linearGradient id="colorBytes" x1="0%" y1="0%" x2="0%" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorCachedBytes" x1="0%" y1="0%" x2="0%" y2="1">
                                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>

                                        <XAxis hide dataKey="formattedTime"/>
                                        <YAxis hide tickFormatter={value => value / 1000}/>

                                        <CartesianGrid strokeDasharray="3 3"/>

                                        <Tooltip
                                            wrapperClassName="text-xs"
                                            labelClassName="whitespace-pre-wrap"
                                            formatter={(value, name) => parseTooltipName(value, name)}/>

                                        <Area type="monotone" dataKey="bytes" stroke="#8884d8" fillOpacity={1}
                                              fill="url(#colorBytes)"/>
                                        <Area type="monotone" dataKey="cachedBytes" stroke="#82ca9d"
                                              fillOpacity={1}
                                              fill="url(#colorCachedBytes)"/>
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Tab>

                        <Tab key={item.zoneName + '2'} title="唯一访问者">
                            <div className="h-[30vh] md:h-[50vh]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={item.data}>
                                        <defs>
                                            <linearGradient id="colorUniques" x1="0%" y1="0%" x2="0%" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>

                                        <XAxis hide dataKey="formattedTime"/>
                                        <YAxis hide/>

                                        <CartesianGrid strokeDasharray="3 3"/>

                                        <Tooltip
                                            wrapperClassName="text-xs"
                                            labelClassName="whitespace-pre-wrap"
                                            formatter={(value, name) => parseTooltipName(value, name)}/>

                                        <Area type="monotone" dataKey="uniques" stroke="#8884d8" fillOpacity={1}
                                              fill="url(#colorUniques)"/>
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            ))}
        </div>
    );
}

export default Home;