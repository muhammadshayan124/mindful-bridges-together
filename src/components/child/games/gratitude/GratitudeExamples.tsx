
import { Card, CardContent } from "@/components/ui/card";

const GratitudeExamples = () => {
  return (
    <Card className="bg-white/50 border border-green-200 rounded-2xl">
      <CardContent className="p-4">
        <h4 className="font-semibold text-green-700 mb-2">Ideas for gratitude:</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-green-600">
          <div>• My family and friends</div>
          <div>• A sunny day</div>
          <div>• My favorite food</div>
          <div>• A good book</div>
          <div>• Playing games</div>
          <div>• Learning something new</div>
          <div>• My pet</div>
          <div>• A comfortable bed</div>
          <div>• Music I love</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GratitudeExamples;
