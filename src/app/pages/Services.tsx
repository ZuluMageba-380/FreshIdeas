import { motion } from "motion/react";
import { Sparkles, TrendingUp, Zap, Check } from "lucide-react";
import { Link } from "react-router";

export default function Services() {
  const services = [
    {
      icon: Sparkles,
      title: "Branding",
      tagline: "Create Your Unique Identity",
      description: "Build a powerful brand that resonates with your audience and stands out in the competitive market. We craft identities that tell your story.",
      image: "https://images.unsplash.com/photo-1764429612824-76b4a677556a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGJyYW5kaW5nJTIwZGVzaWdufGVufDF8fHx8MTc3NTgxMzIxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: [
        "Brand Strategy & Positioning",
        "Logo & Visual Identity Design",
        "Brand Guidelines & Standards",
        "Packaging & Collateral Design",
        "Brand Voice & Messaging",
        "Rebranding & Evolution",
      ],
    },
    {
      icon: TrendingUp,
      title: "Marketing",
      tagline: "Amplify Your Reach",
      description: "Strategic marketing campaigns that drive engagement, build awareness, and deliver measurable results across all digital channels.",
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwc3RyYXRlZ3l8ZW58MXx8fHwxNzc1NzUwMzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: [
        "Digital Marketing Strategy",
        "Social Media Management",
        "Content Creation & Marketing",
        "SEO & SEM Optimization",
        "Email Marketing Campaigns",
        "Analytics & Performance Tracking",
      ],
    },
    {
      icon: Zap,
      title: "IT Solutions",
      tagline: "Technology That Powers Success",
      description: "Cutting-edge technology solutions designed to streamline operations, enhance productivity, and drive business growth.",
      image: "https://images.unsplash.com/photo-1762330467475-a565d04e1808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc29sdXRpb25zJTIwY29kaW5nfGVufDF8fHx8MTc3NTgyMzIwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      features: [
        "Web & Mobile App Development",
        "E-commerce Solutions",
        "Custom Software Development",
        "Cloud Infrastructure & Hosting",
        "IT Consulting & Strategy",
        "Maintenance & Support",
      ],
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive digital solutions tailored to your business needs. 
              We combine creativity, strategy, and technology to deliver exceptional results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <service.icon className="w-5 h-5 text-primary" />
                    <span className="text-primary">{service.tagline}</span>
                  </div>
                  
                  <h2 className="mb-6">{service.title}</h2>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:shadow-[0_0_30px_rgba(115,189,106,0.4)] transition-all"
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </motion.div>
              </div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`relative ${index % 2 === 1 ? "md:order-1" : ""}`}
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent z-10" />
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 5 }}
                  className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discover", description: "Understanding your goals and requirements" },
              { step: "02", title: "Strategy", description: "Developing a customized action plan" },
              { step: "03", title: "Execute", description: "Bringing the vision to life" },
              { step: "04", title: "Optimize", description: "Continuous improvement and growth" },
            ].map((phase, index) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all group"
              >
                <div className="text-6xl mb-4 bg-gradient-to-br from-primary to-green-400 bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity">
                  {phase.step}
                </div>
                <h3 className="mb-3">{phase.title}</h3>
                <p className="text-muted-foreground">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how our services can help your business grow
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-primary text-primary-foreground rounded-lg hover:shadow-[0_0_40px_rgba(115,189,106,0.4)] transition-all"
              >
                Contact Us Today
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
