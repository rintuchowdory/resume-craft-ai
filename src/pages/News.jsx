import React, { useState, useEffect, useCallback } from "react";
import { InvokeLLM } from "@/integrations/Core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Bell, TrendingUp, Calendar, ExternalLink, Search, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ResumeLoader from "@/components/common/ResumeLoader";

export default function News() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const loadNews = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await InvokeLLM({
        prompt: `Fetch the top 12 trending news articles about the job market, career advice, and skills development. Use your access to the internet to find real, current articles from today. For each article, provide a title, a 2-3 sentence summary, the source name, the original article URL, the publication date, and assign a relevant category. The categories are: 'Hiring Trends', 'Salary Insights', 'Remote Work', 'AI Impact', 'Skill Development', 'Industry News'.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            articles: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  summary: { type: "string" },
                  source: { type: "string" },
                  url: {type: "string"},
                  published_date: { type: "string", format: "date" },
                  category: { type: "string", enum: ['Hiring Trends', 'Salary Insights', 'Remote Work', 'AI Impact', 'Skill Development', 'Industry News'] },
                  read_time: { type: "number" }
                },
                required: ["title", "summary", "source", "url", "published_date", "category", "read_time"]
              }
            }
          }
        }
      });
      if (response.articles) {
        setNews(response.articles);
      }
    } catch (error) {
      console.error("Error loading news:", error);
      // You can add a fallback to sample data here if you want
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const categories = [
    { id: "all", label: "All News", icon: Bell },
    { id: "Hiring Trends", label: "Hiring", icon: TrendingUp },
    { id: "Salary Insights", label: "Salaries", icon: Users },
    { id: "Remote Work", label: "Remote", icon: Clock },
    { id: "AI Impact", label: "AI Impact", icon: TrendingUp },
    { id: "Skill Development", label: "Skills", icon: Users }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      "Hiring Trends": "bg-blue-100 text-blue-800",
      "Salary Insights": "bg-green-100 text-green-800",
      "Remote Work": "bg-purple-100 text-purple-800",
      "AI Impact": "bg-orange-100 text-orange-800",
      "Skill Development": "bg-indigo-100 text-indigo-800",
      "Industry News": "bg-gray-100 text-gray-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const filteredNews = news.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return <ResumeLoader />;
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-8 h-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900">Career News & Trends</h1>
          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
            <TrendingUp className="w-4 h-4 mr-1" />
            Live
          </Badge>
        </div>
        <p className="text-gray-600 text-lg">
          Stay updated with the latest job market trends, salary insights, and career opportunities.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search career news and trends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={loadNews} variant="outline" className="border-green-200 hover:bg-green-50">
            Refresh News
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`${selectedCategory === category.id ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-50'}`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-green-200 group flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <Badge className={getCategoryColor(article.category)}>
                    {article.category}
                  </Badge>
                  <span className="text-xs text-gray-500">{article.source}</span>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-green-600 transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0 flex-grow flex flex-col">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {article.summary}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(article.published_date), 'MMM d, yyyy')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.read_time} min read
                  </div>
                </div>
                
                <Button 
                  asChild
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-green-50 group-hover:border-green-200"
                >
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read Full Article
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}