import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Database, Server, Palette, Globe, Zap } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Palette className="h-6 w-6" />,
      color: "text-tech-blue",
      skills: ["React", "Vue.js", "TypeScript", "Next.js", "Tailwind CSS", "SASS", "Webpack", "Vite"]
    },
    {
      title: "Backend",
      icon: <Server className="h-6 w-6" />,
      color: "text-tech-purple",
      skills: ["Node.js", "Python", "Express.js", "FastAPI", "Django", "GraphQL", "REST APIs", "Microservices"]
    },
    {
      title: "Database",
      icon: <Database className="h-6 w-6" />,
      color: "text-accent",
      skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma", "Supabase", "Firebase", "ElasticSearch"]
    },
    {
      title: "DevOps & Cloud",
      icon: <Globe className="h-6 w-6" />,
      color: "text-tech-cyan",
      skills: ["Docker", "AWS", "Azure", "Kubernetes", "CI/CD", "Terraform", "Nginx", "Linux"]
    },
    {
      title: "Tools & Others",
      icon: <Code className="h-6 w-6" />,
      color: "text-primary",
      skills: ["Git", "GitHub Actions", "Jest", "Cypress", "Figma", "VS Code", "Postman", "Jira"]
    },
    {
      title: "Performance",
      icon: <Zap className="h-6 w-6" />,
      color: "text-yellow-400",
      skills: ["Optimization", "Caching", "CDN", "SEO", "PWA", "Web Vitals", "Bundle Analysis", "Load Testing"]
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Yeteneklerim</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Modern teknolojiler ve araçlarla güçlü, ölçeklenebilir uygulamalar geliştiriyorum
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title} 
              className="card-gradient card-shadow border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className={`${category.color} glow-effect rounded-lg p-2 bg-muted/50`}>
                    {category.icon}
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="px-3 py-1 text-sm bg-muted/30 hover:bg-muted/50 transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Experience Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Yıl Deneyim", value: "5+" },
            { label: "Tamamlanan Proje", value: "50+" },
            { label: "Teknoloji", value: "25+" },
            { label: "Memnun Müşteri", value: "100%" }
          ].map((stat, index) => (
            <div 
              key={stat.label} 
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;